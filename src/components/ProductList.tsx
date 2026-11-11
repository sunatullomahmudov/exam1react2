
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAtomValue, useSetAtom } from "jotai";

import {
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

import type { RootState } from "../store/redux";
import type { Product } from "../store/types";

import {
  addRedux,
  editRedux,
  deleteRedux,
} from "../store/CounterSlice";

import { useUserStore } from "../store/zustand";

import {
  imagesAtom,
  addImageAtom,
  editImageAtom,
  deleteImageAtom,
  defaultImage,
} from "../store/jotai";

import ProductForm from "./dialogs/ProductForm";

export default function ProductList() {
  const dispatch = useDispatch();

  const reduxUsers = useSelector(
    (state: RootState) => state.users
  );

  const zustandUsers = useUserStore((state) => state.users);
  const addZustand = useUserStore((state) => state.addUser);
  const editZustand = useUserStore((state) => state.editUser);
  const deleteZustand = useUserStore((state) => state.deleteUser);

  const jotaiUsers = useAtomValue(imagesAtom);
  const addJotai = useSetAtom(addImageAtom);
  const editJotai = useSetAtom(editImageAtom);
  const deleteJotai = useSetAtom(deleteImageAtom);

  const products: Product[] = reduxUsers
    .map((user) => {
      const zustand = zustandUsers.find(
        (item) => item.id === user.id
      );

      const jotai = jotaiUsers.find(
        (item) => item.id === user.id
      );

      if (!zustand || !jotai) return null;

      return {
        ...user,
        age: zustand.age,
        status: zustand.status,
        image: jotai.image,
      };
    })
    .filter((user): user is Product => user !== null);

  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("all");
  const [open, setOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const filteredProducts = products.filter((user) => {
    const findName = user.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const findStatus =
      select === "all" ||
      (select === "active" && user.status) ||
      (select === "inactive" && !user.status);

    return findName && findStatus;
  });

  const openAdd = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  const openEdit = (user: Product) => {
    setSelectedProduct(user);
    setOpen(true);
  };

  const handleSave = (data: Omit<Product, "id">) => {
    if (selectedProduct) {
      const id = selectedProduct.id;

      dispatch(
        editRedux({
          id,
          name: data.name,
          job: data.job,
        })
      );

      editZustand({
        id,
        age: data.age,
        status: data.status,
      });

      editJotai({
        id,
        image: data.image,
      });
    } else {
      const id =
        Math.max(0, ...reduxUsers.map((user) => user.id)) + 1;

      dispatch(
        addRedux({
          id,
          name: data.name,
          job: data.job,
        })
      );

      addZustand({
        id,
        age: data.age,
        status: data.status,
      });

      addJotai({
        id,
        image: data.image,
      });
    }

    setSelectedProduct(null);
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRedux(id));
    deleteZustand(id);
    deleteJotai(id);
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="mx-auto max-w-6xl">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Users</h2>

          <Button variant="contained" onClick={openAdd}>
            Add User
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            size="small"
            label="Status"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((user) => (
            <div
              key={user.id}
              className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-5 text-center"
            >
              <img
                src={user.image || defaultImage}
                alt={user.name}
                className="mb-4 h-20 w-20 rounded-full object-cover"
              />

              <h3 className="mb-2 text-lg font-bold">
                {user.name}
              </h3>

              <p className="mb-2 text-sm">
                {user.age}
              </p>

              <p className="mb-2 text-sm">
                {user.job}
              </p>

              <p className="mb-4 text-sm">
                {user.status ? "Active" : "Inactive"}
              </p>

              <div className="mt-auto flex gap-2 pt-2">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => openEdit(user)}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-5 text-center">
            No users found
          </p>
        )}

        <ProductForm
          open={open}
          close={() => setOpen(false)}
          product={selectedProduct}
          save={handleSave}
        />

      </div>
    </div>
  );
}
