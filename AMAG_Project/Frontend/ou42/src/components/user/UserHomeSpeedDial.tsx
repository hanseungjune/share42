// UserHomeSpeedDial.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useNavigate } from "react-router-dom";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MapIcon from "@mui/icons-material/Map";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "../UI/Dialog";
import useTermsContent from "../../hooks/useTermsContent";

const actions = [
  { icon: <EditIcon sx={{ color: "white" }} />, name: "writing" },
  { icon: <MapIcon sx={{ color: "white" }} />, name: "Save" },
];

export default function UserHomeSpeedDial() {
  const navigate = useNavigate();
  const dialogRef = React.useRef<HTMLDialogElement | any>({});
  const termsContent = useTermsContent();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = (index?: number) => {
    if (index === 0) {
      dialogRef?.current.showModal();
    } else if (index === 1) {
      navigate("/user/map");
    }
    setOpen(false);
  };

  return (
    <Box sx={{ height: 0, flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 16, right: 7 }}
        icon={<SpeedDialIcon sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          backgroundColor: "#FFABAB",
        }} />}
        onClose={() => handleClose()}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClose(index)}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              backgroundColor: "#FFABAB",
            }}
          />
        ))}
      </SpeedDial>
      <Dialog termsContent={termsContent} dialogRef={dialogRef} />
    </Box>
  );
}
