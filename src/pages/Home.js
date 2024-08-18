// import {useSearchParams} from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";
import DiaryList from "../component/DiaryList";

const Home = () => {
  //파라미터 입력 방법.
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("sort"));

  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  const headerTitle = `${pivotDate.getFullYear()}년
                         ${pivotDate.getMonth() + 1}월`;

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  useEffect(() => {
    if (data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  useEffect(() => {
    setPageTitle("용무늬일기장");
  });
  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={filteredData} />
      {/* <Header 
                title={"Home"}
                leftChild={
                    <Button
                        type="positive"
                        text={"긍정버튼"}
                        onClick={()=>{
                            alert("positive button");
                        }}
                    />
                }
                rightChild={
                    <Button
                        type="negative"
                        text={"부정버튼"}
                        onClick={()=>{
                            alert("negative button");
                        }}
                    />
                }
            />
            <div>
                <Editor
                    initData={{
                        date : new Date().getTime(),
                        emotionId:3,
                        content:"이전에 작성 일기",
                    }} 
                    onSubmit={() => {
                    alert("작성 완료 버튼을 클릭");
                }} />
            </div> */}
    </div>
  );
};

export default Home;
