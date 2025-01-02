import { useEffect, useState } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { addDiary, getAllDiaries } from "./diariesService";
import axios from "axios";
import "./App.css";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | string[]>("");

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
    };

    if (comment) newDiary.comment = comment;

    console.log("newDiary", newDiary);

    addDiary(newDiary)
      .then((data) => {
        setDiaries(diaries.concat(data));
        setDate("");
        setVisibility("");
        setWeather("");
        setComment("");
      })
      .catch((error: unknown) => {
        console.log(error);

        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data.error.map(
              (err: { message: string }) => err.message
            )
          );
        } else {
          setErrorMessage("Unknown error occurred");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 8000);
      });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "visibility") {
      setVisibility(e.target.value);
    } else if (e.target.name === "weather") {
      setWeather(e.target.value);
    }
  };

  const displayedErrorMessage = errorMessage ? (
    errorMessage instanceof Array ? (
      errorMessage.map((msg, index) => <p key={index}>{`Error: ${msg}`}</p>)
    ) : (
      <p>{`Error: ${errorMessage}`}</p>
    )
  ) : null;

  return (
    <>
      <h2>Itari's flight diaries</h2>

      <form onSubmit={handleSubmit}>
        <h3>Add new diary diary</h3>
        <div style={{ color: "red" }}>{displayedErrorMessage}</div>
        <div>
          <label>
            <strong>date: </strong>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <strong>visibility:</strong>{" "}
          <label>
            great
            <input
              required
              checked={visibility === "great"}
              type="radio"
              name="visibility"
              value="great"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            good
            <input
              checked={visibility === "good"}
              type="radio"
              name="visibility"
              value="good"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            ok
            <input
              checked={visibility === "ok"}
              type="radio"
              name="visibility"
              value="ok"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            poor
            <input
              checked={visibility === "poor"}
              type="radio"
              name="visibility"
              value="poor"
              onChange={handleRadioChange}
            />
          </label>
        </div>
        <div>
          <strong>weather:</strong>{" "}
          <label>
            sunny
            <input
              required
              checked={weather === "sunny"}
              type="radio"
              name="weather"
              value="sunny"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            rainy
            <input
              checked={weather === "rainy"}
              type="radio"
              name="weather"
              value="rainy"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            cloudy
            <input
              checked={weather === "cloudy"}
              type="radio"
              name="weather"
              value="cloudy"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            stormy
            <input
              checked={weather === "stormy"}
              type="radio"
              name="weather"
              value="stormy"
              onChange={handleRadioChange}
            />
          </label>
          <label>
            windy
            <input
              checked={weather === "windy"}
              type="radio"
              name="weather"
              value="windy"
              onChange={handleRadioChange}
            />
          </label>
        </div>
        <div>
          <label>
            <strong>comment:</strong> (optional){" "}
            <input
              type="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
        </div>
        <button>submit</button>
      </form>
      <div>
        <h3>Diary diaries</h3>
        <ul>
          {diaries &&
            diaries.map((diary) => (
              <li key={diary.id}>
                <h4>{diary.date}</h4>
                <p>{diary.weather}</p>
                <p>{diary.visibility}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default App;
