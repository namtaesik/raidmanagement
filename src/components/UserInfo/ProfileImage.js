//images/LoginUserImages 폴더 내 프로필사진 표출. 확장자 포함
export default function ProfileImage(props) {
  return (
    <img
      src={process.env.PUBLIC_URL + "images/loginUserImages/" + props.imageName}
      style={{
        width: props.size,
        height: props.size,
        objectFit: "cover",
        userSelect: "none",
        borderRadius: "50%",
      }}
      alt="프로필"
    />
  );
}
