import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FilterList from "@mui/icons-material/FilterList";
import Search from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import usersSeed from "../../data/users.json?raw";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import UsersFilterMenu from "../../components/Dashboard/UsersFilterMenu";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(
          String(user.gender ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.gender ?? "")
              .trim()
              .toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "")
          .trim()
          .toLowerCase(),
        role: roles.includes(
          String(user.role ?? "")
            .trim()
            .toLowerCase(),
        )
          ? String(user.role ?? "")
              .trim()
              .toLowerCase()
          : "editor",
        username: String(user.username ?? "")
          .trim()
          .toLowerCase(),
        password: String(user.password ?? "").trim(),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return {
      users: [],
      error: "Unable to read users from src/data/users.json.",
    };
  }
};

const seed = loadUsers();

const userMatchesSearch = (user, rawQuery) => {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const parts = [
    user.firstName,
    user.lastName,
    `${user.firstName} ${user.lastName}`.trim(),
    user.email,
    user.username,
  ].map((s) => String(s ?? "").toLowerCase());
  return parts.some((s) => s.includes(q));
};

const defaultUserFilters = {
  role: "",
  gender: "",
  status: "all",
};

const userMatchesFilters = (user, f) => {
  if (f.role && String(user.role ?? "").toLowerCase() !== f.role) {
    return false;
  }
  if (f.gender && String(user.gender ?? "").toLowerCase() !== f.gender) {
    return false;
  }
  if (f.status === "active" && !user.isActive) {
    return false;
  }
  if (f.status === "inactive" && user.isActive) {
    return false;
  }
  return true;
};

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState(seed.users);
  const [searchDraft, setSearchDraft] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [filterDraft, setFilterDraft] = useState(defaultUserFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultUserFilters);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const displayedUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          userMatchesSearch(u, appliedSearch) &&
          userMatchesFilters(u, appliedFilters),
      ),
    [users, appliedSearch, appliedFilters],
  );

  const runSearch = () => {
    setAppliedSearch(searchDraft);
  };

  const filterMenuOpen = Boolean(filterMenuAnchor);

  const hasActiveFilters =
    Boolean(appliedFilters.role) ||
    Boolean(appliedFilters.gender) ||
    appliedFilters.status !== "all";

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
    setFilterDraft(defaultUserFilters);
    setAppliedFilters(defaultUserFilters);
    closeFilterMenu();
  };

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["password", "Password"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    const ageStr = String(form.age).trim();
    if (!nextErrors.age && ageStr && !/^\d+$/.test(ageStr)) {
      nextErrors.age = "Age must use numbers only (no letters, spaces, or symbols).";
    }

    const contact = String(form.contactNumber).trim();
    if (!nextErrors.contactNumber && contact && !/^\d{11}$/.test(contact)) {
      nextErrors.contactNumber =
        "Contact number must be exactly 11 digits (numbers only, e.g. 09171234567).";
    }

    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = "Username cannot contain spaces. Use letters, numbers, or underscores.";
    }

    if (!nextErrors.password && form.password.trim().length < 8) {
      nextErrors.password = "Password must be at least 8 characters long.";
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address (example: name@email.com).";
    }

    if (
      !nextErrors.email &&
      users.some((user) => user.id !== modal.id && user.email === email)
    ) {
      nextErrors.email = "This email is already used by another user.";
    }

    if (
      !nextErrors.username &&
      users.some((user) => user.id !== modal.id && user.username === username)
    ) {
      nextErrors.username = "This username is already taken. Pick a different one.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender.trim().toLowerCase(),
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role.trim().toLowerCase(),
      username: form.username.trim().toLowerCase(),
      password: form.password.trim(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((user) =>
            user.id === modal.id ? { ...user, ...nextUser } : user,
          )
        : [
            ...prev,
            {
              id:
                prev.reduce(
                  (max, user) => Math.max(max, Number(user.id) || 0),
                  0,
                ) + 1,
              ...nextUser,
            },
          ],
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user,
      ),
    );
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "username", headerName: "Username", minWidth: 150 },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "gender",
      headerName: "Gender",
      minWidth: 110,
      valueGetter: (_, row) => labelize(row.gender),
    },
    { field: "contactNumber", headerName: "Contact Number", minWidth: 160 },
    { field: "email", headerName: "Email", flex: 1.1, minWidth: 220 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      valueGetter: (_, row) => labelize(row.role),
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
          <Button
            size="small"
            variant="outlined"
            onClick={() => openModal(row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row.id)}
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
        <Typography variant="h4">Users</Typography>
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
            placeholder="Search users… (firstName, lastName, email, or username)"
            aria-label="Search users"
            disabled={Boolean(seed.error)}
            className="min-w-0 w-full max-w-full sm:flex-1 sm:max-w-md"
          />
          <Button
            type="button"
            variant="contained"
            startIcon={<Search />}
            disabled={Boolean(seed.error)}
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
            disabled={Boolean(seed.error)}
            aria-expanded={filterMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            aria-controls={filterMenuOpen ? "users-filter-menu" : undefined}
            id="users-filter-button"
            title="Select filters, then click Apply filters"
            onClick={openFilterMenu}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Filters
          </Button>
          <UsersFilterMenu
            anchorEl={filterMenuAnchor}
            open={filterMenuOpen}
            onClose={closeFilterMenu}
            draft={filterDraft}
            setDraft={setFilterDraft}
            onApply={commitFilterDraft}
            roles={roles}
            genders={genders}
          />
          <Button
            type="button"
            variant="outlined"
            disabled={Boolean(seed.error) || !hasActiveFilters}
            onClick={clearFilters}
            sx={{ width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" }}
          >
            Clear filters
          </Button>
          <Button
            variant="contained"
            onClick={() => openModal()}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add User
          </Button>
        </Stack>
      </Box>

      {seed.error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {seed.error}
        </Alert>
      ) : null}

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: "hidden" }}>
        {users.length ? (
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            {displayedUsers.length === 0 && users.length ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                {appliedSearch.trim() && hasActiveFilters
                  ? "No users match your current search and filters. Adjust them and try again."
                  : appliedSearch.trim()
                    ? `No users match "${appliedSearch.trim()}". Change the text and click Search, or try another name, email, or username.`
                    : hasActiveFilters
                      ? "No users match the selected filters. Open Filters, adjust choices, Apply filters, or click Clear filters."
                      : "No users to display."}
              </Alert>
            ) : null}
            <GenericDataGrid
              rows={displayedUsers}
              columns={columns}
              checkboxSelection={false}
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
        ) : (
          <Alert severity="info">
            No users found. Use Add User to create your first record.
          </Alert>
        )}
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("age", "Age", {
                    placeholder: "Numbers only, e.g. 21",
                    inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
                  })}
                />
                <TextField
                  {...fieldProps("gender", "Gender", { select: true })}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("contactNumber", "Contact Number", {
                    placeholder: "11 digits, e.g. 09171234567",
                    inputProps: { maxLength: 11, inputMode: "numeric" },
                  })}
                />
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("role", "Role", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...fieldProps("username", "Username", {
                    placeholder: "No spaces (e.g. juandelacruz01)",
                  })}
                />
              </Stack>

              <TextField
                {...fieldProps("password", "Password", {
                  placeholder: "At least 8 characters",
                  type: showPassword ? "text" : "password",
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(event) => event.preventDefault()}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />

              <TextField
                {...fieldProps("address", "Address (optional)", {
                  multiline: true,
                  rows: 3,
                })}
              />

              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive
                    ? "User status: Active"
                    : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Update User" : "Save User"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
