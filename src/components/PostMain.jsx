import styles from "./PostMain.module.scss";
import Input from "./Message/Input";
import { useState } from "react";
import Option from "./Option";
import CreateBtn from "./Message/CreateBtn";
//Post 페이지 내부의 Main으로 사용될 컴포넌트입니다.

//name : input.value,
//backgroundimg : selectedBackground,

const colors = {
  orange: "$orange2",
  purple: "$purple2",
  blue: "$blue2",
  green: "$green2",
};

function PostMain() {
  const [selectedButton, setSelectedButton] = useState("color");
  const [selectedBackGround, setSelectedBackGround] = useState(colors.orange);
  const [name, setName] = useState("");

  const isCreateButtonDisabled = !name.trim();
  const postData = {
    name,
    backgroundColor: selectedBackGround,
  };

  const handleNameChange = (value) => {
    setName(value);
  };

  const pickBackgorund = (picked) => {
    //최종 선택된 배경
    if (selectedButton === "color") {
      setSelectedBackGround(colors[picked]);
    } else setSelectedBackGround(picked);
  };

  const handleToggleClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <main className={styles.PostMain}>
      <form>
        <label className={styles.to}>To.</label>
        <Input
          id="name"
          placeholder="받는 사람 이름을 입력해 주세요."
          value={name}
          onChange={handleNameChange}
        />
        <label className={styles.choose}>배경화면을 선택해 주세요.</label>
        <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
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
        <div className={styles.btn__container}>
          <Option ColorOrImg={selectedButton} setBackGround={pickBackgorund} />
          <CreateBtn disabled={isCreateButtonDisabled} />
        </div>
      </form>
    </main>
  );
}

export default PostMain;
