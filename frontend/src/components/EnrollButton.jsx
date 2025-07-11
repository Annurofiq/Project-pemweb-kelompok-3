// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EnrollButton = ({ userId, courseId }) => {
//   const navigate = useNavigate();

//   const handleEnroll = () => {
//     if (!userId || !courseId) {
//       alert("User atau Course ID tidak tersedia!");
//       return;
//     }

//     axios
//       .post(
//         "http://localhost/projekUasPemweb/Project-pemweb-kelompok-3/backend/api/enroll-api.php",
//         {
//           user_id: userId,
//           course_id: courseId,
//         }
//       )
//       .then((res) => {
//         alert(res.data.message);
//         navigate("/PembelajaranPage");
//       })
//       .catch((err) => {
//         console.error("Gagal mendaftar kelas:", err);
//         alert("Terjadi kesalahan saat mendaftar kelas");
//       });
//   };

//   return (
//     <button className="btn btn-danger rounded-1" onClick={handleEnroll}>
//       Daftar Sekarang
//     </button>
//   );
// };

// export default EnrollButton;
