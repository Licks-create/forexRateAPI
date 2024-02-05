/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.forexrateapi.com/v1/latest?api_key=" +
            "f06684a77e377a8c48e37b1b8ce4fb85" +
            // "243d4bfec113da8c29029327bddd1a2b"
            "&base=USD&currencies=EUR,INR,JPY"
        );
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        setData(error);
      }
    };
    fetchData();
  }, []);
  if (data === null) {
    return <div>Data is being fetched please wait ....</div>;
  }
  return (
    <>
      {data && (
        <section>
          {data?.success === true ? (
            <div>
              <div>success : True</div>
              <div className="rates">
                <h4>Rates chart Base ({data?.base})</h4>
                <table border={1}>
                  <thead>
                    <tr>
                      {Object.entries(data?.rates).map(([key, value], i) => {
                        return <th key={i}>{key}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(data?.rates).map(([key, value], i) => {
                        return <td key={i}>{value}</td>;
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div>success : False</div>
              {data?.error?.message}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default App;
