import { SketchPicker } from "react-color";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { customizationSliceActions } from "../store/slices/customizationSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomHeaderForm = () => {
  const dispatch = useDispatch();
  const [headerColor, setHeaderColor] = useState("#1d4ed8");
  const [headerFontColor, setHeaderFontColor] = useState("#f4f4f4");
  const [headerBtnColor, setHeaderBtnColor] = useState("#f97316");

  const { customized } = useSelector((state) => state.customization_Slice);

  const handleHeaderColorChange = (colorObj) => {
    const rgba = `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${colorObj.rgb.a})`;
    setHeaderColor(rgba); // ✅ keeps opacity
  };

  const updateHeaderColorChange = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-customization`,
        { headerColor },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Header color changed successfully");
        dispatch(
          customizationSliceActions.changeCustomizationState({
            customized: !customized,
          })
        );
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error changing header color");
    }
  };

  const handleHeaderFontColorChange = async (colorObj) => {
    const rgba = `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${colorObj.rgb.a})`;
    setHeaderFontColor(rgba); // ✅ keeps opacity
  };

  const updateHeaderFontColorChange = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-customization`,
        { headerFontColor },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Header font color changed successfully");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error changing header font color");
    }
  };

  const handleHeaderBtnColorChange = async (colorObj) => {
    const rgba = `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${colorObj.rgb.a})`;
    setHeaderBtnColor(rgba); // ✅ keeps opacity
  };

  const updateHeaderBtnColorChange = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-customization`,
        { btnColor: headerBtnColor },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Header font color changed successfully");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error changing header font color");
    }
  };

  return (
    <div className="flex flex-col justify-start w-full items-center min-h-screen border">
      <h1 className="text-4xl py-3 poppins-light my-10">Customize Header</h1>
      <div className="flex flex-col items-center w-10/12 gap-5 ">
        <div className="flex gap-5">
          <div className="flex flex-col justify-center items-center w-4/12 border rounded-md p-3">
            <h1 className="text-center text-2xl p-2">Header background</h1>
            <div>
              <SketchPicker
                color={headerColor}
                onChangeComplete={handleHeaderColorChange}
                width={400}
              />
              <h2
                className="w-full text-center"
                style={{
                  backgroundColor: headerColor,
                  color: "#fff",
                  padding: "1rem",
                }}
              >
                Header color Preview
              </h2>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-4/12 border rounded-md p-3">
            <h1 className="text-center text-2xl p-2">Header font color</h1>
            <div>
              <SketchPicker
                color={headerFontColor}
                onChangeComplete={handleHeaderFontColorChange}
                width={400}
              />
              <h2
                className="w-full text-center"
                style={{
                  backgroundColor: "#fff",
                  color: headerFontColor,
                  padding: "1rem",
                }}
              >
                Font color Preview
              </h2>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-4/12 border rounded-md p-3">
            <h1 className="text-center text-2xl p-2">Header button color</h1>
            <div>
              <SketchPicker
                color={headerBtnColor}
                onChangeComplete={handleHeaderBtnColorChange}
                width={400}
              />
              <h2
                className="w-full text-center"
                style={{
                  backgroundColor: headerBtnColor,
                  color: headerFontColor,
                  padding: "1rem",
                }}
              >
                Button color Preview
              </h2>
            </div>
          </div>
        </div>

        <button
          className="bg-cyan-500 inline-block py-2 rounded-md hover:bg-cyan-600 w-36 text-white"
          onClick={(e) => {
            updateHeaderColorChange(e),
              updateHeaderFontColorChange(e),
              updateHeaderBtnColorChange(e);
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default CustomHeaderForm;
