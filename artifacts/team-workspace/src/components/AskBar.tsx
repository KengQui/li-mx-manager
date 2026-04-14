import bryteLogo from "@/assets/bryte-logo.svg";

export function AskBar() {
  return (
    <div
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[150]"
      style={{ filter: "drop-shadow(0px 8px 40px rgba(189, 195, 214, 0.4))" }}
      data-testid="ask-bar"
    >
      <div className="bg-white/80 backdrop-blur-[10px] rounded-3xl h-[62px] w-[500px] flex items-center gap-1 pl-4 pr-3 py-1">
        <div className="flex-1 flex items-center gap-[11px] min-w-0">
          <div className="w-8 h-8 shrink-0 relative">
            <img
              alt="Bryte AI"
              src={bryteLogo}
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center gap-[2px]">
            <div className="flex items-center justify-center w-1">
              <div className="w-[2px] h-[22px] bg-black/40 animate-blink" />
            </div>
            <span className="font-sans text-base text-black/60 tracking-[-0.16px] whitespace-nowrap">
              Ask anything
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Attach file"
            className="flex items-center p-[6px] rounded-[50px] hover:bg-black/5 transition-colors"
            data-testid="button-attach"
          >
            <svg className="w-6 h-6" viewBox="0 0 11 20" fill="none">
              <path d="M5 13.5C5 13.7761 5.22386 14 5.5 14C5.77614 14 6 13.7761 6 13.5V4C6 2.89543 5.10457 2 4 2C2.96435 2 2.113 2.78722 2.01074 3.7959L2 4V14.5C2 16.433 3.567 18 5.5 18C7.433 18 9 16.433 9 14.5V7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7V14.5C11 17.5376 8.53757 20 5.5 20C2.46243 20 8.95852e-08 17.5376 0 14.5V4C6.01306e-08 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4V13.5C8 14.8807 6.88071 16 5.5 16C4.11929 16 3 14.8807 3 13.5V5C3 4.44772 3.44772 4 4 4C4.55228 4 5 4.44772 5 5V13.5Z" fill="black" fillOpacity="0.43"/>
            </svg>
          </button>
          <button
            aria-label="Voice mode"
            className="flex items-center p-[10px] bg-[#eef0f7] rounded-[50px] hover:bg-[#e4e6ef] transition-colors"
            data-testid="button-voice"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 16" fill="none">
              <path d="M1.1813 5.42864C1.73358 5.42864 2.1813 5.87635 2.1813 6.42864V9.57171C2.1813 10.124 1.73358 10.5717 1.1813 10.5717H1C0.447715 10.5717 0 10.124 0 9.57171V6.42864C0 5.87635 0.447715 5.42864 1 5.42864H1.1813Z" fill="black" fillOpacity="0.65"/>
              <path d="M6.63597 4.00005C7.18826 4.00005 7.63597 4.44777 7.63597 5.00005V11C7.63597 11.5523 7.18826 12 6.63597 12H6.45467C5.90239 12 5.45468 11.5523 5.45468 11V5.00005C5.45468 4.44776 5.90239 4.00005 6.45468 4.00005H6.63597Z" fill="black" fillOpacity="0.65"/>
              <path d="M12.0906 0C12.6429 0 13.0906 0.447715 13.0906 1L13.0907 15C13.0907 15.5523 12.6429 16 12.0907 16H11.9094C11.3571 16 10.9094 15.5523 10.9094 15L10.9094 1C10.9094 0.447715 11.3571 0 11.9094 0L12.0906 0Z" fill="black" fillOpacity="0.65"/>
              <path d="M17.5453 4.00005C18.0976 4.00005 18.5453 4.44777 18.5453 5.00005V11C18.5453 11.5523 18.0976 12 17.5453 12H17.364C16.8117 12 16.364 11.5523 16.364 11V5.00005C16.364 4.44776 16.8117 4.00005 17.364 4.00005H17.5453Z" fill="black" fillOpacity="0.65"/>
              <path d="M23 5.42864C23.5523 5.42864 24 5.87635 24 6.42864V9.57171C24 10.124 23.5523 10.5717 23 10.5717H22.8187C22.2664 10.5717 21.8187 10.124 21.8187 9.57171V6.42864C21.8187 5.87635 22.2664 5.42864 22.8187 5.42864H23Z" fill="black" fillOpacity="0.65"/>
            </svg>
          </button>
        </div>
      </div>

      <button
        aria-label="Chats"
        className="w-[60px] h-[60px] rounded-full bg-white/80 backdrop-blur-[10px] flex flex-col items-center justify-center shrink-0 py-2 hover:bg-white/90 transition-colors"
        data-testid="button-chats"
      >
        <svg className="w-8 h-8" viewBox="0 0 20 21" fill="none">
          <path d="M5 10.0035C5 9.45104 5.44772 9.00317 6 9.00317C6.55228 9.00317 7 9.45104 7 10.0035C7 10.556 6.55228 11.0039 6 11.0039C5.44772 11.0039 5 10.556 5 10.0035Z" fill="black" fillOpacity="0.65"/>
          <path d="M9 10.0035C9 9.45104 9.44772 9.00317 10 9.00317C10.5523 9.00317 11 9.45104 11 10.0035C11 10.556 10.5523 11.0039 10 11.0039C9.44772 11.0039 9 10.556 9 10.0035Z" fill="black" fillOpacity="0.65"/>
          <path d="M14 9.00317C13.4477 9.00317 13 9.45104 13 10.0035C13 10.556 13.4477 11.0039 14 11.0039C14.5523 11.0039 15 10.556 15 10.0035C15 9.45104 14.5523 9.00317 14 9.00317Z" fill="black" fillOpacity="0.65"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M1.85697 15.8112C0.688193 14.1738 0 12.1679 0 10.0035C0 4.47873 4.47715 0 10 0C15.5228 0 20 4.47873 20 10.0035C20 15.5283 15.5228 20.007 10 20.007H9C8.93816 20.007 8.86874 20.0107 8.81 20C8.40374 19.9891 8.07064 19.9651 7.75625 19.9516C6.79177 19.9103 6.08679 19.88 4.58193 20.0037C3.57844 20.0861 2.75599 20.3961 2.1826 20.6393C2.1104 20.67 2.04249 20.6994 1.97696 20.7278L1.9573 20.7364C1.89971 20.7614 1.84203 20.7864 1.78875 20.809C1.68585 20.8528 1.53794 20.9147 1.39837 20.9526C1.33484 20.9699 1.19296 21.0056 1.02125 20.9993C0.852347 20.993 0.438572 20.9312 0.175845 20.5226C-0.0537586 20.1654 0.015025 19.8105 0.0389519 19.7058C0.068908 19.5747 0.117816 19.4661 0.150537 19.3998L1.85697 15.8112ZM2 10.0035C2 5.58369 5.58172 2.0007 10 2.0007C14.4183 2.0007 18 5.58369 18 10.0035C18 14.4234 14.4183 18.0063 10 18.0063H9.58163C9.55871 18.0045 9.53558 18.0034 9.51225 18.0031C8.89861 17.9957 8.40284 17.9748 7.94053 17.9554C6.91111 17.9121 6.04758 17.8758 4.41824 18.0097C3.86156 18.0554 3.35219 18.1542 2.90078 18.2736L3.90312 16.1657C3.97535 16.0138 4.00594 15.8529 3.99948 15.6957C4.0072 15.4638 3.93474 15.2281 3.77737 15.0336C2.66536 13.6589 2 11.9103 2 10.0035Z" fill="black" fillOpacity="0.65"/>
        </svg>
      </button>
      <button
        aria-label="Files"
        className="w-[60px] h-[60px] rounded-full bg-white/80 backdrop-blur-[10px] flex flex-col items-center justify-center shrink-0 py-2 hover:bg-white/90 transition-colors"
        data-testid="button-files"
      >
        <svg className="w-8 h-8" viewBox="0 0 16 20" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M15 0L15.1166 0.0067277C15.614 0.0644928 16 0.487164 16 1C16 1.51284 15.614 1.93551 15.1166 1.99327L15 2H4.23077L4.06956 2.00512C2.89926 2.07969 2 2.95994 2 4C2 5.04006 2.89926 5.92031 4.06956 5.99488L4.23077 6H15C15.5128 6 15.9355 6.38604 15.9933 6.88338L16 7V19C16 19.5128 15.614 19.9355 15.1166 19.9933L15 20H3.15385C1.48954 20 0.102373 18.7671 0.00541258 17.178L0 17V4L0.00521994 3.79889C0.112672 1.73436 1.86558 0.104687 4.02097 0.0048492L4.23077 0H15ZM1.99962 7.3992L2 17C2 17.4994 2.43618 17.9377 3.02536 17.9939L3.15385 18H14V8H4.23077L4.02097 7.99515C3.28347 7.96099 2.59309 7.74772 1.99962 7.3992ZM15 3.0105C15.5523 3.0105 16 3.45821 16 4.0105C16 4.52333 15.614 4.94601 15.1166 5.00377L15 5.0105H6.00777C5.45549 5.0105 5.00777 4.56278 5.00777 4.0105C5.00777 3.49766 5.39381 3.07499 5.89115 3.01723L6.00777 3.0105H15Z" fill="black" fillOpacity="0.65"/>
        </svg>
      </button>
      <button
        aria-label="Workspaces"
        className="w-[60px] h-[60px] rounded-full bg-white/80 backdrop-blur-[10px] flex flex-col items-center justify-center shrink-0 py-2 hover:bg-white/90 transition-colors"
        data-testid="button-workspaces"
      >
        <svg className="w-8 h-8" viewBox="0 0 18 18" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M15 0C16.5977 0 17.9037 1.24892 17.9949 2.82373L18 3V15C18 16.5977 16.7511 17.9037 15.1763 17.9949L15 18H3C1.40232 18 0.0963391 16.7511 0.00509262 15.1763L0 15V3C0 1.40232 1.24892 0.0963391 2.82373 0.00509262L3 0H15ZM15 2H3C2.48716 2 2.06449 2.38604 2.00673 2.88338L2 3V15C2 15.5128 2.38604 15.9355 2.88338 15.9933L3 16H15C15.5128 16 15.9355 15.614 15.9933 15.1166L16 15V3C16 2.48716 15.614 2.06449 15.1166 2.00673L15 2ZM13 12C13.5523 12 14 12.4477 14 13C14 13.5128 13.614 13.9355 13.1166 13.9933L13 14H5C4.44772 14 4 13.5523 4 13C4 12.4872 4.38604 12.0645 4.88338 12.0067L5 12H13ZM13 8C13.5523 8 14 8.44772 14 9C14 9.51284 13.614 9.93551 13.1166 9.99327L13 10H5C4.44772 10 4 9.55228 4 9C4 8.48716 4.38604 8.06449 4.88338 8.00673L5 8H13ZM5 4C5.55228 4 6 4.44772 6 5C6 5.55228 5.55228 6 5 6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4ZM13 4C13.5523 4 14 4.44772 14 5C14 5.51284 13.614 5.93551 13.1166 5.99327L13 6H9C8.44772 6 8 5.55228 8 5C8 4.48716 8.38604 4.06449 8.88338 4.00673L9 4H13Z" fill="black" fillOpacity="0.65"/>
        </svg>
      </button>
    </div>
  );
}
