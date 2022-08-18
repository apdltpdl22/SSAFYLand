import { useState, useEffect } from "react";
import axios from "axios"; // 설치 후 import
import { useForm } from "react-hook-form";

const serverUrl = "https://k6d102.p.ssafy.io";

interface pdfData {
  fileName: string;
}

export default function Admin() {
  const [pdfList, setPdfList] = useState<pdfData[]>([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("files", data.file[0]);

    console.log(data.file[0]);

    const res = await fetch(serverUrl + "/api/file/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  // 페이지 시작 시 pdfList 불러오기
  useEffect(() => {
    loadPdfList();
  }, []);

  const loadPdfList = async () => {
    axios
      .get(serverUrl + "/api/file")
      .then(({ data }) => {
        console.log(data.result);
        setPdfList(data.result);
      })
      .catch((e) => {
        console.error(e); // API 호출이 실패한 경우 에러표시
      });
  };

  return (
    <div>
      <h1>SsafyLand PDF 관리자페이지</h1>
      {pdfList.map((pdfData, idx) => {
        return (
          <div key={idx}>
            <a href={serverUrl + "/api/file/download/" + pdfData.fileName}>
              {pdfData.fileName}
            </a>
          </div>
        );
      })}
      <br />
      {/* pdf파일 업로드
      <input
        type="file"
        id="pdf"
        // ref="picture"
        accept="pdf"
      />
      <button>업로드</button>
      <br /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" multiple accept=".pdf" {...register("file")} />
        <input type="submit" value="업로드"></input>
      </form>
    </div>
  );
}
