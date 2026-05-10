import {
  Button,
  Checkbox,
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
} from "@mui/material";

function ArticlesFilterMenu({ anchorEl, open, onClose, draft, setDraft, onApply }) {
  return (
    <Menu
      id="articles-filter-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        list: {
          "aria-labelledby": "articles-filter-button",
          sx: { minWidth: 260 },
        },
      }}
    >
      <ListSubheader>Status</ListSubheader>
      <MenuItem
        dense
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            status: prev.status === "active" ? "all" : "active",
          }))
        }
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Checkbox
            edge="start"
            checked={draft.status === "active"}
            tabIndex={-1}
            disableRipple
            size="small"
          />
        </ListItemIcon>
        <ListItemText primary="Active" />
      </MenuItem>
      <MenuItem
        dense
        onClick={() =>
          setDraft((prev) => ({
            ...prev,
            status: prev.status === "inactive" ? "all" : "inactive",
          }))
        }
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <Checkbox
            edge="start"
            checked={draft.status === "inactive"}
            tabIndex={-1}
            disableRipple
            size="small"
          />
        </ListItemIcon>
        <ListItemText primary="Inactive" />
      </MenuItem>
      <Divider component="li" />
      <MenuItem
        disableRipple
        sx={{
          cursor: "default",
          bgcolor: "transparent",
          py: 1.5,
          "&:hover": { bgcolor: "transparent" },
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
        >
          Apply filters
        </Button>
      </MenuItem>
    </Menu>
  );
}

export default ArticlesFilterMenu;
