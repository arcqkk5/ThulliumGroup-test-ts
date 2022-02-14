import { useEffect, useState } from "react";
import axios from "axios";
import { PhotoList } from "../photoList/photoList";
import { Header } from "../header/header";
import { Paginations } from "../pagination/pagination";
import { Filter } from "../filter/filter";
import { Photos } from "../../interfaces";

import "./app.scss";

declare var confirm: (value: string) => boolean;

export const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photos[]>([]);
  //Loading
  const [loading, setLoading] = useState<boolean>(false);
  //Работа с фильтром
  const [value, setValue] = useState<string>("");

  const handleChange = (value: string) => setValue(value);

  //Работа с пагинацией
  //Номер текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  //Количество карточек на странице
  const [photosPerPage] = useState(16);
  const lastPhotoIndex = currentPage * photosPerPage;
  const firstPhotoIndex = lastPhotoIndex - photosPerPage;
  let currentPhoto = photos.slice(firstPhotoIndex, lastPhotoIndex);

  //Получение новой страницы по клику
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //Работа с получением всех картинок
  const getPhotos = async () => {
    setLoading(true);
    const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`);
    setPhotos(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const deleteCard = (id: number) => {
    const shoudDelete = confirm("Are you sure you want to delete the card?");
    if (shoudDelete) {
      setPhotos((photos) => photos.filter((item) => item.id !== id));
    }
  };

  if (value !== "") {
    currentPhoto = photos.filter((item) => item.id === +value);
  }

  return (
    <main className="main">
      <Header />
      <section className="group">
        <Paginations
          photosPerPage={photosPerPage}
          total={photos.length}
          paginate={paginate}
        />
        <Filter handleChange={handleChange} />
      </section>
      <PhotoList
        photos={currentPhoto}
        loading={loading}
        deleteCard={deleteCard}
      />
    </main>
  );
};
