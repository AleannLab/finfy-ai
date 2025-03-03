import { FooterAuth } from "@/components/molecules";
import { ReactNode } from "react";
import { Metadata } from "next";
import { RootMain } from "@/components/atoms";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Chat | Career Buddy",
  description: "Chat",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <RootMain className={clsx("w-full bg-[#1F1F1F] flex-col flex")}>
      <div className="flex flex-col w-full mt-[100px] items-center justify-center">
        <div data-svg-wrapper className="relative">
          <svg width="201" height="44" viewBox="0 0 201 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M53.9076 20.6778C53.9033 21.267 53.8606 21.856 53.7794 22.4447L39.5217 22.341C39.59 23.5201 39.9038 24.4064 40.4632 24.9998C41.0483 25.5677 41.7893 25.8549 42.686 25.8614C43.9414 25.8706 44.8422 25.3134 45.3884 24.1901L53.4204 24.2485C53.0765 25.732 52.4135 27.0596 51.4314 28.231C50.475 29.377 49.2643 30.2778 47.7991 30.9333C46.3339 31.5888 44.7174 31.9102 42.9495 31.8973C40.8231 31.8819 38.9304 31.4197 37.2716 30.5109C35.6384 29.6022 34.3539 28.3118 33.4181 26.6396C32.5078 24.9675 32.0609 23.0042 32.0773 20.7496C32.0937 18.495 32.569 16.5512 33.5033 14.9182C34.4377 13.2595 35.7281 11.9878 37.3743 11.103C39.0462 10.2184 40.9581 9.78395 43.1102 9.7996C45.2367 9.81507 47.1167 10.2643 48.75 11.1473C50.3834 12.0304 51.6553 13.2951 52.5657 14.9415C53.4763 16.5623 53.9236 18.4744 53.9076 20.6778ZM46.2351 18.7387C46.2419 17.8164 45.9396 17.0968 45.3285 16.5799C44.7175 16.0374 43.9508 15.7628 43.0285 15.7561C42.1062 15.7494 41.3485 16.0001 40.7555 16.5082C40.1627 16.9907 39.7731 17.7181 39.5867 18.6904L46.2351 18.7387Z" fill="white" />
            <path d="M66.0929 32.0656C64.1457 32.0515 62.4059 31.7185 60.8733 31.0669C59.3665 30.3897 58.1689 29.4842 57.2804 28.3504C56.4177 27.1912 55.9403 25.8938 55.8482 24.4583L63.1501 24.5114C63.2475 25.2039 63.5639 25.7443 64.0991 26.1325C64.6343 26.5207 65.2991 26.7177 66.0933 26.7235C66.7082 26.7279 67.1959 26.6034 67.5564 26.3498C67.917 26.0962 68.0988 25.7644 68.1017 25.3545C68.1057 24.8165 67.8139 24.4172 67.2265 24.1567C66.6391 23.8962 65.6676 23.6073 64.3119 23.29C62.7769 22.9714 61.4984 22.6162 60.4764 22.2244C59.4544 21.8326 58.5622 21.1984 57.8 20.3217C57.0633 19.4452 56.7004 18.264 56.7112 16.778C56.7205 15.497 57.0748 14.3466 57.774 13.3268C58.4734 12.2814 59.4914 11.456 60.8282 10.8508C62.1905 10.2458 63.8196 9.95021 65.7155 9.964C68.5338 9.9845 70.7449 10.6924 72.3489 12.0876C73.953 13.4829 74.8749 15.3087 75.1147 17.5652L68.3125 17.5157C68.1894 16.823 67.8858 16.2956 67.4016 15.9334C66.9432 15.5457 66.3169 15.349 65.5227 15.3432C64.9078 15.3387 64.433 15.4506 64.0982 15.6787C63.7891 15.9071 63.6331 16.2262 63.6301 16.6361C63.6264 17.1486 63.9181 17.5478 64.5053 17.8339C65.0927 18.0944 66.0387 18.3703 67.3433 18.6617C68.9038 19.0061 70.1949 19.387 71.2167 19.8044C72.2642 20.2219 73.1688 20.8947 73.9308 21.8226C74.7185 22.7251 75.1066 23.9578 75.0953 25.5206C75.0861 26.7761 74.7064 27.9007 73.9562 28.8945C73.2315 29.8884 72.1881 30.6751 70.826 31.2545C69.4896 31.8085 67.9119 32.0789 66.0929 32.0656Z" fill="white" />
            <path d="M86.4197 13.3814C87.0162 12.3864 87.8547 11.5983 88.935 11.0168C90.0154 10.4354 91.2857 10.15 92.7461 10.1606C94.4626 10.1731 96.0094 10.6327 97.3864 11.5395C98.789 12.4464 99.8813 13.7355 100.663 15.4066C101.471 17.0779 101.867 19.028 101.851 21.257C101.835 23.486 101.41 25.443 100.578 27.128C99.7719 28.7875 98.6609 30.0606 97.2452 30.947C95.8552 31.8337 94.3019 32.2708 92.5854 32.2583C91.125 32.2477 89.8589 31.9438 88.7872 31.3467C87.741 30.7498 86.9141 29.9495 86.3065 28.9458L86.2098 42.2429L78.6774 42.1881L78.9091 10.329L86.4415 10.3838L86.4197 13.3814ZM94.2031 21.2014C94.2133 19.7923 93.8369 18.7006 93.0739 17.9264C92.3367 17.1268 91.4172 16.7229 90.3156 16.7149C89.2139 16.7069 88.2759 17.0972 87.5015 17.8859C86.7527 18.6747 86.3733 19.7609 86.3632 21.1444C86.353 22.5535 86.7165 23.6579 87.4537 24.4575C88.2165 25.2574 89.1488 25.6613 90.2505 25.6693C91.3521 25.6773 92.2774 25.2869 93.0261 24.4981C93.8007 23.6838 94.193 22.5849 94.2031 21.2014Z" fill="white" />
            <path d="M125.552 21.1988C125.548 21.7881 125.505 22.3771 125.424 22.9658L111.166 22.8621C111.235 24.0412 111.548 24.9274 112.108 25.5208C112.693 26.0887 113.434 26.376 114.331 26.3825C115.586 26.3916 116.487 25.8345 117.033 24.7111L125.065 24.7695C124.721 26.2531 124.058 27.5806 123.076 28.7521C122.12 29.8981 120.909 30.7989 119.444 31.4544C117.978 32.1099 116.362 32.4312 114.594 32.4184C112.468 32.4029 110.575 31.9407 108.916 31.0319C107.283 30.1233 105.998 28.8328 105.063 27.1606C104.152 25.4886 103.705 23.5252 103.722 21.2706C103.738 19.016 104.214 17.0722 105.148 15.4392C106.082 13.7806 107.373 12.5089 109.019 11.6241C110.691 10.7395 112.603 10.305 114.755 10.3206C116.881 10.3361 118.761 10.7853 120.395 11.6684C122.028 12.5514 123.3 13.8161 124.21 15.4625C125.121 17.0833 125.568 18.9954 125.552 21.1988ZM117.88 19.2598C117.886 18.3374 117.584 17.6178 116.973 17.1009C116.362 16.5584 115.595 16.2838 114.673 16.2771C113.751 16.2704 112.993 16.5211 112.4 17.0293C111.807 17.5118 111.418 18.2392 111.231 19.2114L117.88 19.2598Z" fill="white" />
            <path d="M142.817 10.6016C145.302 10.6197 147.269 11.4667 148.717 13.1426C150.165 14.793 150.879 17.0273 150.859 19.8455L150.767 32.4124L143.235 32.3576L143.319 20.7899C143.328 19.5602 143.015 18.5971 142.379 17.9006C141.744 17.1786 140.888 16.8137 139.812 16.8059C138.685 16.7977 137.798 17.1499 137.153 17.8626C136.507 18.5497 136.18 19.5082 136.171 20.738L136.087 32.3056L128.554 32.2508L128.711 10.6912L136.244 10.7459L136.221 13.8204C136.894 12.8517 137.797 12.0768 138.928 11.4957C140.06 10.889 141.356 10.591 142.817 10.6016Z" fill="white" />
            <path d="M158.549 32.7764C157.217 32.7668 156.143 32.4002 155.329 31.6769C154.54 30.9281 154.15 29.9901 154.158 28.8628C154.166 27.7355 154.57 26.8032 155.37 26.066C156.195 25.329 157.274 24.9653 158.606 24.975C159.912 24.9845 160.96 25.3636 161.749 26.1124C162.563 26.8614 162.967 27.7995 162.958 28.9268C162.95 30.0285 162.534 30.9478 161.709 31.6849C160.909 32.4221 159.856 32.7859 158.549 32.7764Z" fill="white" />
            <path d="M165.308 21.7185C165.325 19.4895 165.736 17.5453 166.542 15.8857C167.374 14.2263 168.485 12.9533 169.875 12.0666C171.291 11.1802 172.857 10.7432 174.574 10.7557C176.059 10.7665 177.338 11.0704 178.41 11.6675C179.482 12.2646 180.309 13.0649 180.891 14.0684L180.913 11.0708L188.445 11.1256L188.288 32.6853L180.756 32.6305L180.778 29.6329C180.181 30.6278 179.33 31.4159 178.224 31.9971C177.144 32.5786 175.873 32.864 174.413 32.8534C172.696 32.8409 171.137 32.3812 169.734 31.4742C168.357 30.5674 167.265 29.2784 166.457 27.6071C165.675 25.9104 165.292 23.9475 165.308 21.7185ZM180.834 21.8314C180.844 20.4479 180.468 19.3562 179.705 18.5564C178.968 17.7568 178.049 17.353 176.947 17.3449C175.82 17.3367 174.882 17.7271 174.133 18.5159C173.384 19.2791 173.005 20.3653 172.995 21.7744C172.984 23.1579 173.348 24.2623 174.085 25.0876C174.822 25.8872 175.754 26.2911 176.882 26.2993C177.983 26.3073 178.909 25.9169 179.657 25.1281C180.432 24.3394 180.824 23.2406 180.834 21.8314Z" fill="white" />
            <path d="M196.556 9.18606C195.224 9.17637 194.151 8.80985 193.336 8.08652C192.547 7.33775 192.157 6.41252 192.165 5.31083C192.173 4.18353 192.577 3.25127 193.377 2.51405C194.202 1.77702 195.281 1.41334 196.613 1.42303C197.919 1.43253 198.967 1.81167 199.756 2.56045C200.57 3.3094 200.974 4.24753 200.965 5.37484C200.957 6.47652 200.541 7.39588 199.716 8.13291C198.916 8.84451 197.863 9.19556 196.556 9.18606ZM200.27 11.2116L200.113 32.7713L192.58 32.7165L192.737 11.1568L200.27 11.2116Z" fill="white" />
            <path d="M17.3761 19.7389L26.7258 36.2086L7.78785 36.0709L17.3761 19.7389Z" fill="white" />
            <path d="M10.2911 24.4736L0.941406 8.00391L19.8793 8.14163L10.2911 24.4736Z" fill="white" />
          </svg>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center relative z-10 p-6">
        {children}
      </div>
      <div className="text-center text-sm w-full px-5 flex items-center justify-center pb-5 lg:pb-24 text-[#E9E9E9]">
        <div className="text-center text-sm max-w-[410px] text-[#E9E9E9]">
          By continuing, you agree to Career Buddy’s{" "}
          <a
            href="/terms-of-service"
            className="text-[#e9e9e9] underline hover:no-underline"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="text-[#e9e9e9] underline hover:no-underline"
          >
            Usage Policy
          </a>
          , and acknowledge our{" "}
          <a
            href="/privacy-policy"
            className="text-[#e9e9e9] underline hover:no-underline"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </RootMain>
  );
}
