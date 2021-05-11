import { useState } from 'react';
import AdditionalService from './additionalService';
import UserService from './userService';

const UploadImageAction = (initial = {}) => {
  const [image, setImage] = useState(null);
  const [profileSrc, setProfileSrc] = useState('');
  const [uploadSrc, setUploadSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = input => {

    if(input.target.files.length === 0) return;

    let reader = new FileReader();
    let file = input.target.files[0];

    reader.onloadend = async () => {
      await setUploadSrc(reader.result);
      await setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const saveUpload = async idNumber => {
    setProcessing(true);
    const formData = new FormData();
    formData.append('image', image);
    let imageUrl = '';

    try {
      let response = await AdditionalService.uploadProfile(formData);
      imageUrl = response.data[0].secure_url;
      return await setStudentProfile(imageUrl, idNumber);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    };
  };

  const setStudentProfile = async (imgSrc = '', idNumber = '') => {
    try {
      let params = {
        idNumber: idNumber,
        profileImgSrc: imgSrc
      };
      let response = await UserService.updateProfileImg(params);
      setProfileSrc(response.data.profileImgSrc);
      setUploadSrc('');
      setProcessing(false);
      return response.data;
    } catch (error) {
      console.log(error);
    };
  };

  return {
    saveUpload,
    handleChange,
    profileSrc,
    loading,
    uploadSrc,
    processing,
    setProfileSrc,
    setUploadSrc
  }
};

export default UploadImageAction;