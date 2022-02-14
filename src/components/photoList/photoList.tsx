import { useState } from "react";
import { ModalWindow } from "../modalWindow/modalWindow";
import { Photos } from "../../interfaces";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import "./photoList.scss";

interface PhotoListProps {
  photos: Photos[];
  loading: boolean;
  deleteCard(id: number): void;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  loading,
  deleteCard,
}) => {
  //ModalWindow
  const [open, setOpen] = useState<boolean>(false);
  const [urlModal, setUrlModal] = useState<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkIdModalWindow = (url: string) => setUrlModal(url);

  if (loading) {
    return <h3>Please wait, loading...</h3>;
  }

  const renderItemCard = (arr: any[]) => {
    const items = arr.map((item) => {
      return (
        <div className="photo__list-item" key={item.id}>
          <Card>
            <CardMedia
              component="img"
              image={item.thumbnailUrl}
              alt="photo"
              onClick={() => {
                handleOpen();
                checkIdModalWindow(item.url);
              }}
            />
            <CardContent>
              <Typography variant="body2" className="card--text">
                {item.title
                  ? `${item.title.substr(0, 24)}...`
                  : `There is no description of this photo`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => deleteCard(item.id)}>Delete</Button>
            </CardActions>
          </Card>
        </div>
      );
    });
    return items;
  };

  return (
    <section className="photo__list">
      {renderItemCard(photos)}
      <ModalWindow
        open={open}
        url={urlModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </section>
  );
};
