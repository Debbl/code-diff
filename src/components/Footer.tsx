import Image from "next/image";
import GithubIcon from "~/assets/images/github.svg";

function Footer() {
  return (
    <div className="flex justify-center py-6">
      <a href="https://github.com/Debbl/code-diff">
        <Image src={GithubIcon} alt="" unoptimized></Image>
      </a>
    </div>
  );
}

export default Footer;
