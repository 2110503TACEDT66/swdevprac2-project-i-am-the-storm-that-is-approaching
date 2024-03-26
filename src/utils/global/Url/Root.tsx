import { useRouter } from "next/router";

export default function RootRedirect(url: string, asPath?: boolean) {
  const currentPath = useRouter().asPath;

  return (
    <meta
      http-equiv="refresh"
      content={`0; url=${asPath ? currentPath + url : url}`}
    />
  );
}
