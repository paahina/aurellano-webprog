import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import FilterList from "@mui/icons-material/FilterList";
import {
  buildArticlePayload,
  createArticle,
  deleteArticle,
  fetchArticles,
  getArticleErrorMessage,
  mapArticleFromApi,
  updateArticle,
} from "../../services/ArticleService";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import ArticlesFilterMenu from "../../components/Dashboard/ArticlesFilterMenu";

const defaultArticleFilters = {
  status: "all",
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const truncate = (text, max) => {
  const s = String(text ?? "").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
};

const getArticleId = (article) => article?._id ?? article?.id ?? null;

const blankForm = {
  name: "",
  title: "",
  imageUrl: "",
  body: "",
  isActive: true,
};

const articleMatchesSearch = (article, rawQuery) => {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const idStr = String(getArticleId(article) ?? "");
  const parts = [
    idStr,
    article.title,
    article.name,
    article.description,
  ].map((s) => String(s ?? "").toLowerCase());
  return parts.some((s) => s.includes(q));
};

const articleMatchesFilters = (article, f) => {
  if (f.status === "active" && !article.isActive) return false;
  if (f.status === "inactive" && article.isActive) return false;
  return true;
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchDraft, setSearchDraft] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [filterDraft, setFilterDraft] = useState(defaultArticleFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultArticleFilters);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [deleteTarget, setDeleteTarget] = useState({
    open: false,
    id: null,
    title: "",
  });

  const filterMenuOpen = Boolean(filterMenuAnchor);
  const hasActiveFilters = appliedFilters.status !== "all";
  const busy = loading || submitting;

  const displayedArticles = useMemo(
    () =>
      articles.filter(
        (a) =>
          articleMatchesSearch(a, appliedSearch) &&
          articleMatchesFilters(a, appliedFilters),
      ),
    [articles, appliedSearch, appliedFilters],
  );

  const loadArticles = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await fetchArticles();
      const list = data?.articles ?? [];
      setArticles(list.map(mapArticleFromApi));
    } catch (err) {
      console.error("Failed to load articles:", err);
      setLoadError(getArticleErrorMessage(err) || "Failed to load articles.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const runSearch = () => {
    setAppliedSearch(searchDraft);
  };

  const openFilterMenu = (event) => {
    setFilterDraft({ ...appliedFilters });
    setFilterMenuAnchor(event.currentTarget);
  };

  const closeFilterMenu = () => {
    setFilterMenuAnchor(null);
  };

  const commitFilterDraft = () => {
    setAppliedFilters({ ...filterDraft });
    closeFilterMenu();
  };

  const clearFilters = () => {
    setFilterDraft(defaultArticleFilters);
    setAppliedFilters(defaultArticleFilters);
    closeFilterMenu();
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (article) => {
    setActionError("");
    setModal({ open: true, id: article ? getArticleId(article) : null });
    if (article) {
      setForm({
        name: article.name ?? "",
        title: article.title ?? "",
        imageUrl: article.imageUrl ?? "",
        body: (article.content ?? []).join("\n\n"),
        isActive: article.isActive ?? true,
      });
    } else {
      resetForm();
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    resetForm();
    setActionError("");
  };

  const openDeleteDialog = (article) => {
    setActionError("");
    setDeleteTarget({
      open: true,
      id: getArticleId(article),
      title: article.title ?? article.name ?? "this article",
    });
  };

  const closeDeleteDialog = () => {
    setDeleteTarget({ open: false, id: null, title: "" });
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const name = form.name.trim().toLowerCase();
    const title = form.title.trim();
    const imageUrl = form.imageUrl.trim();
    const body = form.body.trim();

    if (!name) {
      nextErrors.name = "Slug is required.";
    } else if (!SLUG_PATTERN.test(name)) {
      nextErrors.name =
        "Slug must be lowercase letters, numbers, and hyphens only (e.g. react-intro).";
    } else if (
      articles.some(
        (a) =>
          String(getArticleId(a)) !== String(modal.id) &&
          String(a.name ?? "").toLowerCase() === name,
      )
    ) {
      nextErrors.name = "This slug is already used by another article.";
    }

    if (!title) nextErrors.title = "Title is required.";
    if (!imageUrl) nextErrors.imageUrl = "Image path is required.";
    if (!body) nextErrors.body = "Body is required.";

    return nextErrors;
  };

  const fieldProps = (name, label, extra = {}) => {
    const { helperText: extraHelper, ...rest } = extra;
    return {
      name,
      label,
      value: form[name],
      onChange: handleFormChange,
      error: Boolean(errors[name]),
      helperText: errors[name] || extraHelper || "",
      fullWidth: true,
      required: true,
      disabled: submitting,
      ...rest,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionError("");
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = buildArticlePayload(form);
    setSubmitting(true);
    try {
      if (modal.id) {
        const { data } = await updateArticle(modal.id, payload);
        const mapped = mapArticleFromApi(data);
        setArticles((prev) =>
          prev.map((a) =>
            String(getArticleId(a)) === String(modal.id) ? mapped : a,
          ),
        );
      } else {
        const { data } = await createArticle(payload);
        const mapped = mapArticleFromApi(data);
        setArticles((prev) => [...prev, mapped]);
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save article:", err);
      const message = getArticleErrorMessage(err);
      setActionError(message);
      if (/name|slug|duplicate/i.test(message)) {
        setErrors((prev) => ({
          ...prev,
          name: message.includes("name") ? message : prev.name,
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (id) => {
    const article = articles.find((a) => String(getArticleId(a)) === String(id));
    if (!article) return;

    setActionError("");
    setSubmitting(true);
    try {
      const { data } = await updateArticle(id, {
        isActive: !article.isActive,
      });
      const mapped = mapArticleFromApi(data);
      setArticles((prev) =>
        prev.map((a) => (String(getArticleId(a)) === String(id) ? mapped : a)),
      );
    } catch (err) {
      console.error("Failed to update article status:", err);
      setActionError(getArticleErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget.id) return;

    setActionError("");
    setSubmitting(true);
    try {
      await deleteArticle(deleteTarget.id);
      setArticles((prev) =>
        prev.filter((a) => String(getArticleId(a)) !== String(deleteTarget.id)),
      );
      closeDeleteDialog();
    } catch (err) {
      console.error("Failed to delete article:", err);
      setActionError(getArticleErrorMessage(err));
      if (err.response?.status === 404) {
        await loadArticles();
        closeDeleteDialog();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 120,
      valueGetter: (_, row) => String(row?._id ?? row?.id ?? ""),
    },
    {
      field: "name",
      headerName: "Slug",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.2,
      minWidth: 200,
      valueGetter: (_, row) => truncate(row.description, 120),
    },
    {
      field: "imagePreview",
      headerName: "Image preview",
      sortable: false,
      filterable: false,
      width: 130,
      renderCell: ({ row }) => (
        <Box
          component="img"
          src={row.imageUrl}
          alt=""
          sx={{
            height: 40,
            maxWidth: 100,
            objectFit: "cover",
            borderRadius: 1,
            display: "block",
            mt: 0.5,
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      sortable: false,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
          variant={row.isActive ? "filled" : "outlined"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 300,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5, flexWrap: "wrap" }}>
          <Button
            size="small"
            variant="outlined"
            disabled={busy}
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            disabled={busy}
            onClick={() => toggleStatus(getArticleId(row))}
          >
            {row.isActive ? "Disable" : "Activate"}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            disabled={busy}
            onClick={() => openDeleteDialog(row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Articles</Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", sm: "center" }}
          useFlexGap
          className="w-full min-w-0 sm:w-auto sm:flex-1 sm:justify-end"
        >
          <TextField
            size="small"
            value={searchDraft}
            onChange={(e) => setSearchDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
              }
            }}
            placeholder="Search..."
            aria-label="Search articles"
            disabled={busy}
            className="min-w-0 w-full max-w-full sm:flex-1 sm:max-w-md"
          />
          <Button
            type="button"
            variant="contained"
            startIcon={<Search />}
            disabled={busy}
            onClick={runSearch}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Search
          </Button>
          <Button
            type="button"
            variant="outlined"
            color={hasActiveFilters ? "primary" : "inherit"}
            startIcon={<FilterList />}
            disabled={busy}
            aria-expanded={filterMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            aria-controls={filterMenuOpen ? "articles-filter-menu" : undefined}
            id="articles-filter-button"
            title="Select filters, then click Apply filters"
            onClick={openFilterMenu}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Filters
          </Button>
          <ArticlesFilterMenu
            anchorEl={filterMenuAnchor}
            open={filterMenuOpen}
            onClose={closeFilterMenu}
            draft={filterDraft}
            setDraft={setFilterDraft}
            onApply={commitFilterDraft}
          />
          <Button
            type="button"
            variant="outlined"
            disabled={busy || !hasActiveFilters}
            onClick={clearFilters}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Clear filters
          </Button>
          <Button
            type="button"
            variant="contained"
            disabled={busy}
            onClick={() => openModal()}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Add Article
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loadError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loadError}
          </Alert>
        ) : null}

        {actionError && !modal.open && !deleteTarget.open ? (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setActionError("")}>
            {actionError}
          </Alert>
        ) : null}

        {!loadError && (articles.length > 0 || loading) ? (
          <Box sx={{ width: "100%", minWidth: 0 }}>
            {displayedArticles.length === 0 && articles.length > 0 ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                {appliedSearch.trim() && hasActiveFilters
                  ? "No articles match your current search and filters. Adjust them and try again."
                  : appliedSearch.trim()
                    ? `No articles match "${appliedSearch.trim()}". Change the text and click Search, or try another title or name.`
                    : hasActiveFilters
                      ? "No articles match the selected filters. Open Filters, adjust choices, Apply filters, or click Clear filters."
                      : "No articles to display."}
              </Alert>
            ) : null}
            <GenericDataGrid
              rows={displayedArticles}
              columns={columns}
              getRowId={(row) => getArticleId(row)}
              checkboxSelection={false}
              loading={loading}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                minWidth: 0,
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
                  outline: "none",
                },
              }}
            />
          </Box>
        ) : null}

        {!loadError && !loading && articles.length === 0 ? (
          <Alert severity="info">
            No articles found. Use Add Article to create your first article.
          </Alert>
        ) : null}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={submitting ? undefined : closeModal}
        fullWidth
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit Article" : "Add Article"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              {actionError ? (
                <Alert severity="error">{actionError}</Alert>
              ) : null}
              {modal.id ? (
                <Typography variant="body2" color="text.secondary">
                  Article ID: {String(modal.id)}
                </Typography>
              ) : null}
              <TextField
                {...fieldProps("name", "Slug (URL name)", {
                  placeholder: "e.g. react-introduction-frontend",
                  helperText:
                    errors.name ||
                    "Lowercase letters, numbers, and hyphens only.",
                })}
              />
              <TextField {...fieldProps("title", "Title")} />
              <TextField
                {...fieldProps("imageUrl", "Image path", {
                  placeholder: "/assets/imgs/card (1).jpg",
                  helperText:
                    errors.imageUrl ||
                    "Public path to a local image under public/ (no file upload).",
                })}
              />
              <TextField
                {...fieldProps("body", "Body", {
                  multiline: true,
                  minRows: 6,
                  placeholder: "Paragraphs separated by a blank line",
                })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting
                ? "Saving…"
                : modal.id
                  ? "Update Article"
                  : "Create Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={deleteTarget.open}
        onClose={submitting ? undefined : closeDeleteDialog}
      >
        <DialogTitle>Delete article</DialogTitle>
        <DialogContent>
          {actionError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {actionError}
            </Alert>
          ) : null}
          <DialogContentText>
            Delete article <strong>{deleteTarget.title}</strong>? This cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDeleteDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            disabled={submitting}
            onClick={confirmDelete}
          >
            {submitting ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
