import { Icon } from "@iconify/react";
import logoGithub from "@iconify/icons-carbon/logo-github";

function GitHubInfo() {
  return (
    <div className="ml-8 flex size-[18px] justify-center">
      <a
        href="https://github.com/Debbl/code-diff"
        target="_blank"
        rel="noreferrer"
      >
        <Icon icon={logoGithub} className="size-[18px]" />
      </a>
    </div>
  );
}

export default GitHubInfo;
