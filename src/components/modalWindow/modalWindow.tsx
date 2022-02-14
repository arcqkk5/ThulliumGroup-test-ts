import { CardMedia, Backdrop, Box, Modal, Fade } from "@mui/material";
import "./modalWindow.scss";

interface ModalWindowProps {
  open: boolean;
  url: string;
  handleOpen(): void;
  handleClose(): void;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  open,
  handleClose,
  url,
  handleOpen,
}) => {
  return (
    <Modal open={open} onClose={handleClose} BackdropComponent={Backdrop}>
      <Fade in={open}>
        <Box className="modal__window">
          <CardMedia
            component="img"
            height="600"
            width="600"
            image={url}
            alt="photo_modal"
            onClick={handleOpen}
          />
        </Box>
      </Fade>
    </Modal>
  );
};
