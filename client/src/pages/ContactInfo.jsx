import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import ContactInfoFrom from "../comps/ContactInfoForm";

const ContactInfo = () => {
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        <ContactInfoFrom />
      </div>
    </Layout>
  );
};

export default ContactInfo;
