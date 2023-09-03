import Image from "next/image";
import GithubIcon from "~/assets/images/github.svg";
import useMainStore from "~/store/useMainStore";
import GithubIconDark from "~/assets/images/github-dark.svg";

function GitHubInfo() {
  const theme = useMainStore((s) => (s.theme === "vs-dark" ? "dark" : "light"));
  return (
    <div className="ml-8 flex h-[16px] w-[16px] justify-center">
      <a
        href="https://github.com/Debbl/code-diff"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={theme === "light" ? GithubIcon : GithubIconDark}
          alt="https://github.com/Debbl/code-diff"
          unoptimized
        ></Image>
      </a>
    </div>
  );
}

export default GitHubInfo;
