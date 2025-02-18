import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
import logoSchema from "../utils/validation/logoSchema";
import ModalImage from "react-modal-image";
import { ImCross } from "react-icons/im";

const LogoForm = () => {
  const [logo, setLogo] = useState({
    imgKey: null,
  });

  const [uploadedLogo, setUploadedLogo] = useState({
    keyId: null,
    logoWithURL: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [logogDeleted, setLogoDeleted] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo((prev) => ({ ...prev, imgKey: file }));
  };

  const fetchLogo = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/fetch-logo`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUploadedLogo(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const uplaodLogo = async () => {
    setLoading(true);

    const result = logoSchema.safeParse({ logoKey: logo.imgKey });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      const logoData = new FormData();
      logoData.append("logoKey", logo.imgKey);

      const res = await axios.post(
        `http://localhost:8000/api/v1/upload-logo`,
        logoData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteLogo = async (id) => {
    const confimation = confirm("Do you really want to delete?");
    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-logo/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setUploadedLogo({
          keyId: null,
          logoWithURL: null,
        });
        setLogoDeleted((prev) => !prev);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogo();
  }, [logogDeleted]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <div className="w-5/12">
            <div className="flex justify-center items-center mt-10">
              <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
                Logo
              </h1>
            </div>
            <div className="flex flex-col items-center my-3">
              <form action={uplaodLogo} className="flex w-full">
                <input
                  type="file"
                  name="logoKey"
                  id="logoKey"
                  onChange={handleLogoChange}
                  placeholder="Upload logo"
                  className="border border-gray-300 rounded p-1 mr-2 w-full"
                  required
                />
                <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                  Upload
                </button>
              </form>

              {uploadedLogo.keyId !== null ? (
                <div className="flex w-6/12 m-5 p-2 border border-gray-300 rounded-md">
                  <ModalImage
                    small={uploadedLogo.logoWithURL}
                    large={uploadedLogo.logoWithURL}
                    alt="Preview"
                    className="w-full mr-2 rounded-md"
                  />
                  <ImCross
                    className="hover:cursor-pointer hover:text-3xl  text-orange-500 text-2xl border border-orange-600 rounded-full p-1"
                    onClick={() => {
                      deleteLogo(uploadedLogo.keyId);
                    }}
                  />
                </div>
              ) : (
                <h1 className="mt-5 text-xl">No Logo uploaded</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoForm;
