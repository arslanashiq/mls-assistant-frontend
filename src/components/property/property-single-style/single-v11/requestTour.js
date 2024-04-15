import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ScheduleForm from "./ScheduleForm";
const RequestTour = ({ page_data }) => {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleClose = () => setOpen(false);
  const handleCloseInfo = () => setOpenInfo(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [siteName, setSiteName] = React.useState("siteName");
  return (
    <div>
      <div className="row mt-3">
        <div className="col-md-6 col-6 pr-1">
          <button className="btn-request" onClick={handleOpen}>
            Request Tour
          </button>
        </div>
        <div className="col-md-6 col-6 pl-1">
          <button className="btn-request-info" onClick={handleOpenInfo}>
            Ask a question
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4>Request a tour</h4>
          <ScheduleForm page_data={page_data} type="tour" setOpen={setOpen}></ScheduleForm>
        </Box>
      </Modal>
      <Modal
        open={openInfo}
        onClose={handleCloseInfo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4>Request Info</h4>
          <ScheduleForm page_data={page_data} type="info" setOpenInfo={setOpenInfo}></ScheduleForm>
        </Box>
      </Modal>
    </div>
  );
};

export default RequestTour;
