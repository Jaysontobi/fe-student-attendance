import { useState } from 'react';
import { message } from 'antd';
import AdditionalService from './additionalService';
import UserService from './userService';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadImageAction = (initial = {}) => {
  const [image, setImage] = useState(null);
  const [profileSrc, setProfileSrc] = useState('');
  const [uploadSrc, setUploadSrc] = useState('');
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleChange = input => {

    if (input.file.status === 'uploading') {
      setLoading(true);
      return;
    };

    if (input.file.status === 'done') {
      setImage(input.file.originFileObj);
      // Get this url from response in real world.
      getBase64(input.file.originFileObj, imageUrl => {
        setLoading(false);
        setUploadSrc(imageUrl);
      });
    }
  };

  const saveUpload = async idNumber => {
    setProcessing(true);
    const formData = new FormData();
    formData.append('image', image);
    let imageUrl = '';

    try {
      let response = await AdditionalService.uploadProfile(formData);
      imageUrl = response.data[0].secure_url;
      setProfileSrc(imageUrl);
      setUploadSrc('');
      setStudentProfile(imageUrl, idNumber);
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
      let response = UserService.updateProfileImg(params);
      console.log(response);
    } catch (error) {
      console.log(error);
    };

    setProcessing(false);
  };

  return {
    saveUpload,
    handleChange,
    profileSrc,
    beforeUpload,
    loading,
    uploadSrc,
    processing,
    setProfileSrc,
    setUploadSrc
  }
};

export default UploadImageAction;