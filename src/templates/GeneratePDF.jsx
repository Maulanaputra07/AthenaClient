import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const GeneratePDF = ({ siswa }) => {
  const generatePDF = async () => {
    const element = document.createElement("div");
    element.style.padding = "20px";
    element.style.width = "210mm";
    element.style.minHeight = "297mm";
    element.style.background = "#fff";
    element.innerHTML = `
      <div style="text-align: center; ">
        <img src="${window.location.origin}/tunas.png" width="100" alt="Logo Sekolah" />
      </div>
      <h1 style="text-align: center; font-size: 1.3em;">Pendaftaran Siswa Baru Telah Berhasil!</h1>
      <br/>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr><th style="${styles.th}">No. Pendaftaran</th><td style="${styles.td}">${siswa.id}</td></tr>
          <tr><th style="${styles.th}">Status</th><td style="${styles.td}">${siswa.status === 1 ? "✅ Sudah Daftar Ulang" : "❌ Belum Daftar Ulang"}</td></tr>
          <tr><th style="${styles.th}">Nama Siswa</th><td style="${styles.td}">${siswa.name}</td></tr>
          <tr><th style="${styles.th}">Tempat, Tanggal Lahir</th><td style="${styles.td}">${siswa.tempat_lahir}, ${siswa.tanggal_lahir}</td></tr>
          <tr><th style="${styles.th}">NIK</th><td style="${styles.td}">${siswa.nik}</td></tr>
          <tr><th style="${styles.th}">NISN</th><td style="${styles.td}">${siswa.nisn}</td></tr>
          <tr><th style="${styles.th}">Jenis Kelamin</th><td style="${styles.td}">${siswa.jenis_kelamin === 1 ? "Laki-Laki" : "Perempuan"}</td></tr>
          <tr><th style="${styles.th}">Agama</th><td style="${styles.td}">${siswa.agama}</td></tr>
          <tr><th style="${styles.th}">Alamat</th><td style="${styles.td}">${siswa.alamat_lengkap}</td></tr>
          <tr><th style="${styles.th}">No. Telepon</th><td style="${styles.td}">${siswa.no_telepon}</td></tr>
          <tr><th style="${styles.th}">Asal Sekolah</th><td style="${styles.td}">${siswa.asal_sekolah}</td></tr>
          <tr><th style="${styles.th}">Jurusan</th><td style="${styles.td}">${siswa.jurusan}</td></tr>
        </tbody>
      </table>
      <div style="display: flex; flex-direction: column; margin-top: 20px;">
        <p>Proses pendaftaran ulang telah selesai, simpan dokumen ini sebagai bukti pendaftaran siswa. Selamat datang menjadi bagian dari SMK Tunas Harapan Pati.</p>
      </div>
      <div style="text-align: left; margin-top: 25rem; font-size: 12px;">
        ${siswa.created_at}
      </div>
    `;

    document.body.appendChild(element);

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Dokumen_Pendaftaran_${siswa.id}.pdf`);
      
      document.body.removeChild(element);
    });
  };

  return (
    <button onClick={generatePDF} className="bg-blue rounded" style={{ padding: "10px",  color: "#fff", border: "none", cursor: "pointer" }}>
      Docs
    </button>
  );
};

const styles = {
  th: "border: 1px solid #000; padding: 8px; text-align: left; background: #f1f1f1; font-weight: bold;",
  td: "border: 1px solid #000; padding: 8px; text-align: left;",
};

export default GeneratePDF;
