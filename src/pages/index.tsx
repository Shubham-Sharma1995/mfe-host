import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the SSR page from the remote app
// const RemoteSSRPage = dynamic(() => import("remoteApp/RemoteApp"), {
//   ssr: true, // Ensure SSR is enabled
// });
const RemoteSSRPage = dynamic(() => import("remoteApp/RemoteApp"), {
  // Ensure SSR is enabled
  ssr: true,
});

// Create a wrapper component to use the SSR page
const HostSSRPage = (props: any) => {
  return <RemoteSSRPage {...props} />;
};

// Export the wrapper as a Next.js page with getServerSideProps
export const getServerSideProps = async (context: any) => {
  // Optionally, fetch additional data or manipulate props here

  return {
    props: {}, // Pass down props to the remote SSR page
  };
};

export default HostSSRPage;
