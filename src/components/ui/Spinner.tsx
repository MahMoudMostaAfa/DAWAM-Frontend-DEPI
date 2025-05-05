import Layout from "@/components/layout/Layout";

function Spinner() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dawam-purple"></div>
      </div>
    </Layout>
  );
}

export default Spinner;
