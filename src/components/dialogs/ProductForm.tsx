
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import type { Product } from "../../store/types";
import { defaultImage } from "../../store/jotai";

type Props = {
  open: boolean;
  close: () => void;
  product: Product | null;
  save: (data: Omit<Product, "id">) => void;
};

export default function ProductForm({
  open,
  close,
  product,
  save,
}: Props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState("true");
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setAge(String(product.age));
      setJob(product.job);
      setStatus(String(product.status));
      setImage(product.image);
    } else {
      setName("");
      setAge("");
      setJob("");
      setStatus("true");
      setImage(defaultImage);
    }
  }, [product, open]);

  const handleSave = () => {
    if (!name.trim() || !job.trim() || !age.trim()) return;
    if (!Number.isInteger(Number(age)) || Number(age) <= 0) return;

    save({
      name: name.trim(),
      age: Number(age),
      job: job.trim(),
      status: status === "true",
      image: image.trim() || defaultImage,
    });

    close();
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogTitle>
        {product ? "Edit User" : "Add User"}
      </DialogTitle>

      <DialogContent className="flex flex-col gap-4">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
        />

        <TextField
          label="Job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </TextField>

        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={close}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          {product ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
