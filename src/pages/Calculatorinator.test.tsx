import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button/Button.tsx";
import Calculatorinator from "./Calculatorinator.tsx";

test("load and display 1 button", async () => {
    const buttonName = "4";
    render(<Button text={buttonName} id={buttonName}/>);
    const button = await screen.findByTestId("fourButton");
    fireEvent.click(button);
    expect(button).toBeDefined();
});

test("loads and displays buttons", async () => {
    render(<Calculatorinator/>);
    const fourButton = await screen.findByTestId("fourButton");
    const eightButton = await screen.findByTestId("eightButton");
    const addButton = await screen.findByTestId("addButton");
    const solveButton = await screen.findByTestId("solveButton");
    const answerArea = await screen.findByTestId("answerArea");

    expect(fourButton).toBeDefined();

    fireEvent.click(fourButton);
    expect(answerArea.textContent).toBe("4");

    fireEvent.click(addButton);
    expect(answerArea.textContent).toBe("4+");

    fireEvent.click(eightButton);
    expect(answerArea.textContent).toBe("4+8");

    fireEvent.click(solveButton);
    expect(answerArea.textContent).toBe("12");
});

test("Tests 4 basic functions with positive integers", async () => {
    render(<Calculatorinator/>);
    const fourButton = await screen.findByTestId("fourButton");
    const eightButton = await screen.findByTestId("eightButton");
    const addButton = await screen.findByTestId("addButton");
    const solveButton = await screen.findByTestId("solveButton");
    const answerArea = await screen.findByTestId("answerArea");
});


describe("Render Calculatorinator Page",  () => {
    let twoButton: HTMLElement;
    let threeButton: HTMLElement;
    let fourButton: HTMLElement;
    let eightButton: HTMLElement;
    let multiplyButton: HTMLElement;
    let divideButton: HTMLElement;
    let addButton: HTMLElement;
    let subtractButton: HTMLElement;
    let solveButton: HTMLElement;
    let clearButton:HTMLElement;
    let answerArea: HTMLElement;

    beforeAll(async() => {
        render(<Calculatorinator/>);
        //get num buttons
        twoButton = await screen.findByTestId("twoButton");
        threeButton = await screen.findByTestId("threeButton");
        fourButton = await screen.findByTestId("fourButton");
        eightButton = await screen.findByTestId("eightButton");

        //get operators
        multiplyButton = await screen.findByTestId("multiplyButton");
        divideButton = await screen.findByTestId("divideButton");
        addButton = await screen.findByTestId("addButton");
        subtractButton = await screen.findByTestId("subtractButton");
        solveButton = await screen.findByTestId("solveButton");
        clearButton = await screen.findByTestId("clearButton");
        answerArea = await screen.findByTestId("answerArea");

        //test for undefined/defined
        expect(twoButton).toBeDefined();
        expect(threeButton).toBeDefined();
        expect(multiplyButton).toBeDefined();
        expect(divideButton).toBeDefined();
        expect(addButton).toBeDefined();
        expect(subtractButton).toBeDefined();
        expect(answerArea).toBeDefined();
        expect(solveButton).toBeDefined();
        expect(clearButton).toBeDefined();
    });


    it("Tests 4 basic functions with positive integers", async () => {
        //expects
        fireEvent.click(multiplyButton);
        expect(answerArea.textContent).toBe("");//check to make sure we don't let the input start with an operator(excluding - which will be it's own test

        //test multiply
        fireEvent.click(clearButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("2*3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("6");

        //test divide
        fireEvent.click(clearButton);
        fireEvent.click(twoButton);
        fireEvent.click(divideButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("2/3");
        fireEvent.click(solveButton);
        expect(parseFloat(answerArea.textContent!)).toBeCloseTo(0.66666);

        //test add
        fireEvent.click(clearButton);
        fireEvent.click(twoButton);
        fireEvent.click(addButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("2+3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("5");

        //test subtract
        fireEvent.click(clearButton);
        fireEvent.click(twoButton);
        fireEvent.click(subtractButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("2-3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("-1");
    });

    it("Tests 4 basic functions with negative integers", async () => {
        //expects
        fireEvent.click(multiplyButton);
        expect(answerArea.textContent).toBe("");//check to make sure we don't let the input start with an operator(excluding - which will be it's own test

        //test multiply
        fireEvent.click(clearButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(multiplyButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("-2*3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("-6");

        //test divide
        fireEvent.click(clearButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(divideButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("-2/3");
        fireEvent.click(solveButton);
        expect(parseFloat(answerArea.textContent!)).toBeCloseTo(-0.66666);

        //test add
        fireEvent.click(clearButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(addButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("-2+3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("1");

        //test subtract
        fireEvent.click(clearButton);
        fireEvent.click(subtractButton);
        fireEvent.click(twoButton);
        fireEvent.click(subtractButton);
        fireEvent.click(threeButton);
        expect(answerArea.textContent).toBe("-2-3");
        fireEvent.click(solveButton);
        expect(answerArea.textContent).toBe("-5");
    });
});


// describe("renders and tests various parts of the calculator page", function () {
//
// });

/*
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
 */

/*
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from '../fetch'

const server = setupServer(
  rest.get('/greeting', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('loads and displays greeting', async () => {
  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await screen.findByRole('heading')

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})

test('handles server error', async () => {
  server.use(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.status(500))
    }),
  )

  render(<Fetch url="/greeting" />)

  fireEvent.click(screen.getByText('Load Greeting'))

  await screen.findByRole('alert')

  expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
  expect(screen.getByRole('button')).not.toBeDisabled()
})
 */
