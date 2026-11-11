
import { atom } from "jotai";

export const defaultImage =
  "https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?w=300";

type ImageUser = {
  id: number;
  image: string;
};

export const imagesAtom = atom<ImageUser[]>([
  { id: 1, image: defaultImage },
  { id: 2, image: defaultImage },
  { id: 3, image: defaultImage },
  { id: 4, image: defaultImage },
  { id: 5, image: defaultImage },
  { id: 6, image: defaultImage },
]);

export const addImageAtom = atom(
  null,
  (get, set, user: ImageUser) => {
    set(imagesAtom, [...get(imagesAtom), user]);
  }
);

export const editImageAtom = atom(
  null,
  (get, set, updatedUser: ImageUser) => {
    set(
      imagesAtom,
      get(imagesAtom).map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }
);

export const deleteImageAtom = atom(
  null,
  (get, set, id: number) => {
    set(
      imagesAtom,
      get(imagesAtom).filter((user) => user.id !== id)
    );
  }
);
