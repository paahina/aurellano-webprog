import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import FilterList from "@mui/icons-material/FilterList";
import { fetchArticles, mapArticleFromApi } from "../../services/ArticleService";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import ArticlesFilterMenu from "../../components/Dashboard/ArticlesFilterMenu";

const defaultArticleFilters = {
  status: "all",
};

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
  const [searchDraft, setSearchDraft] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [filterDraft, setFilterDraft] = useState(defaultArticleFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultArticleFilters);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);

  const filterMenuOpen = Boolean(filterMenuAnchor);

  const hasActiveFilters = appliedFilters.status !== "all";

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
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load articles.",
      );
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

  const openModal = (article) => {
    setModal({ open: true, id: getArticleId(article) });
    setForm({
      name: article.name,
      title: article.title,
      imageUrl: article.imageUrl,
      body: (article.content ?? []).join("\n\n"),
    });
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm(blankForm);
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const paragraphs = form.body
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const content = paragraphs.length ? paragraphs : [""];
    const description = String(content[0] ?? "").trim();

    setArticles((prev) =>
      prev.map((a) =>
        String(getArticleId(a)) === String(modal.id)
          ? {
              ...a,
              name: form.name.trim(),
              title: form.title.trim(),
              imageUrl: form.imageUrl.trim(),
              content,
              description,
            }
          : a,
      ),
    );
    closeModal();
  };

  const toggleStatus = (id) => {
    setArticles((prev) =>
      prev.map((a) =>
        String(getArticleId(a)) === String(id)
          ? { ...a, isActive: !a.isActive }
          : a,
      ),
    );
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
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(getArticleId(row))}
          >
            {row.isActive ? "Disable" : "Activate"}
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
            disabled={loading}
            className="min-w-0 w-full max-w-full sm:flex-1 sm:max-w-md"
          />
          <Button
            type="button"
            variant="contained"
            startIcon={<Search />}
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading || !hasActiveFilters}
            onClick={clearFilters}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Clear filters
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {loadError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loadError}
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
            No articles found. Add documents to the articles collection (e.g.
            via API or MongoDB) to see them here.
          </Alert>
        ) : null}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>Edit Article</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Article ID: {modal.id ? String(modal.id) : ""}
              </Typography>
              <TextField
                name="name"
                label="Slug (URL name)"
                value={form.name}
                onChange={handleFormChange}
                fullWidth
                required
                placeholder="e.g. react-introduction-frontend"
              />
              <TextField
                name="title"
                label="Title"
                value={form.title}
                onChange={handleFormChange}
                fullWidth
                required
              />
              <TextField
                name="imageUrl"
                label="Image path"
                value={form.imageUrl}
                onChange={handleFormChange}
                fullWidth
                required
                placeholder="/assets/imgs/card (1).jpg"
                helperText="Public path to a local image under public/ (no file upload)."
              />
              <TextField
                name="body"
                label="Body"
                value={form.body}
                onChange={handleFormChange}
                fullWidth
                required
                multiline
                minRows={6}
                placeholder="Paragraphs separated by a blank line"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              Update Article
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
