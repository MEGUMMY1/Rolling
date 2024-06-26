import styles from "./PostMain.module.scss";
import Input from "./Message/Input";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Option from "./Option";
import CreateBtn from "./Message/CreateBtn";
import { postRecipients } from "../Api/Api";
import CancelBtn from "./Message/CancelBtn";
//Post 페이지 내부의 Main으로 사용될 컴포넌트입니다.

//name : input.value,
//backgroundimg : selectedBackground,

function PostMain() {
  const [selectedButton, setSelectedButton] = useState("color");
  const [pickedBackGround, setPickedBackGround] = useState({
    backgroundColor: "beige",
    backgroundImageURL: null,
  });
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const isCreateButtonDisabled = !name.trim();

  const handleNameChange = (value) => {
    setName(value);
  };

  const pickBackground = useCallback((color, url) => {
    setPickedBackGround((prev) => ({
      ...prev,
      backgroundColor: color,
      backgroundImageURL: url,
    }));
  }, []);

  const handleToggleClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleCreatePost = async () => {
    try {
      console.log("post 생성중..");

      const postID = await postRecipients(
        name,
        pickedBackGround.backgroundColor,
        pickedBackGround.backgroundImageURL
      );
      console.log("생성완료");
      console.log(postID);
      navigate(`/post/${postID.id}`);
    } catch (error) {
      console.log("생성 실패 :");
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <main className={styles.PostMain}>
      <form>
        <section className={styles.section}>
          <label className={styles.to}>To.</label>
          <Input
            id="name"
            placeholder="받는 사람 이름을 입력해 주세요."
            value={name}
            onChange={handleNameChange}
          />
        </section>
        <section className={styles.section}>
          <label className={styles.choose}>배경화면을 선택해 주세요.</label>
          <p className={styles.text}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </p>
        </section>
        <section className={styles.section}>
          <div className={styles.toggle}>
            <button
              type="button"
              name="color"
              className={`${styles.toggleButton} ${selectedButton === "color" ? styles.checked : styles.unchecked}`}
              onClick={() => handleToggleClick("color")}
            >
              컬러
            </button>
            <button
              type="button"
              name="image"
              className={`${styles.toggleButton} ${selectedButton === "image" ? styles.checked : styles.unchecked}`}
              onClick={() => handleToggleClick("image")}
            >
              이미지
            </button>
          </div>
        </section>
        <div className={styles.btn__container}>
          <Option ColorOrImg={selectedButton} setBackGround={pickBackground} />
          <div className={styles.btns}>
            <CancelBtn onClick={handleCancel} />
            <CreateBtn
              disabled={isCreateButtonDisabled}
              onClick={handleCreatePost}
            />
          </div>
        </div>
      </form>
    </main>
  );
}

export default PostMain;
