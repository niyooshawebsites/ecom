import { SketchPicker } from "react-color";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CustomFooterForm = () => {
  const [footerColor, setFooterColor] = useState("");
  const [footerFontColor, setFooterFontColor] = useState("#");

  const handleHFooterColorChange = async (colorObj) => {
    const rgba = `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${colorObj.rgb.a})`;
    setFooterColor(rgba); // ✅ keeps opacity

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-customization`,
        { footerColor },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Header color changed successfully");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error changing header color");
    }
  };

  const handleFooterFontColorChange = async (colorObj) => {
    const rgba = `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${colorObj.rgb.a})`;
    setFooterFontColor(rgba); // ✅ keeps opacity

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-customization`,
        { footerFontColor },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Header color changed successfully");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Error changing header color");
    }
  };

  return (
    <div className="flex flex-col justify-start w-full items-center min-h-screen border">
      <h1 className="text-4xl py-3 poppins-light my-10">Customize Footer</h1>
      <div className="flex w-10/12 gap-5 ">
        <div className="flex flex-col justify-center items-center w-4/12 border rounded-md p-3">
          <h1 className="text-center text-2xl p-2">Footer background color</h1>
          <div>
            <SketchPicker
              color={footerColor}
              onChangeComplete={handleHFooterColorChange}
              width={400}
            />
            <h2
              className="w-full text-center"
              style={{
                backgroundColor: footerColor,
                color: footerFontColor,
                padding: "1rem",
              }}
            >
              Footer color Preview
            </h2>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-4/12 border rounded-md p-3">
          <h1 className="text-center text-2xl p-2">Footer font color</h1>
          <div>
            <SketchPicker
              color={footerFontColor}
              onChangeComplete={handleFooterFontColorChange}
              width={400}
            />
            <h2
              className="w-full text-center"
              style={{
                backgroundColor: "#fff",
                color: footerFontColor,
                padding: "1rem",
              }}
            >
              Font color Preview
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFooterForm;
