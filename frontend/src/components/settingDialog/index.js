import { Backdrop, Box, Button, CircularProgress, Dialog, DialogTitle, Input } from "@mui/material";
import React, { useContext, useState } from "react";

import { storage } from "../../firebase";

import { ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';
import { AuthContext } from "../../context/authContext";
const SettingDialog = (props) => {
  const { onClose, selectedValue, open } = props;
  const authContext = useContext(AuthContext)
  const handleClose = () => {
    onClose(selectedValue);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(authContext.userAvatar);
  const [upLoading, setUpLoading] = useState(false);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = () => {

    if (!selectedFile) {
      alert("Avatar can't be empty")
    }
    else if (selectedFile.name.split(".")[1] !== "jpg") {
      alert("Invalid avatar format")
    }
    else if (!authContext.isAuthenticated) {
      alert("You haven't login")
    }
    else {
      const storageRef = ref(storage, 'avatars/' + authContext.userProfile.id + "." + selectedFile.name.split(".")[1])
      const blob = new Blob([selectedFile], { type: 'image/jpg' });
      setUpLoading(true)
      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          console.log('Uploaded a avatar: avatars/' + authContext.userProfile.id + "." + selectedFile.name.split(".")[1]);
          setUpLoading(false)
          authContext.setUserAvatarFromFirebase(authContext.userProfile.id);
        })
        .catch((error) => {
          console.error(error);
          setUpLoading(false)
        });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle textAlign={"center"}>Change Avatar</DialogTitle>
      <Box>
        <Input type="file" inputProps={{ accept: '.jpg' }} fullWidth onChange={handleFileChange} > 123 </Input>
      </Box>
      {previewUrl && <img src={previewUrl} alt="avatar preview" />}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={upLoading}
      // onClick={handleClose}
      >
        <CircularProgress />
      </Backdrop>
      <Button onClick={handleUpload}>Upload</Button>
      {/* {upLoading && <CircularProgress />} */}
    </Dialog>
  )
}

export default SettingDialog;