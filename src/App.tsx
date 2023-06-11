import "./App.scss";
import Calculatorinator from "./pages/Calculatorinator.tsx";
import {getRPN} from "./utils/ShuntingYard/ShuntingYard.ts";

function App() {

    return (
        <>
            <Calculatorinator/>
        </>
    );
}

export default App;
