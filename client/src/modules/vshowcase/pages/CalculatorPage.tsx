import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import styled from 'styled-components';
import AppIcon from '../../../shared/components/AppIcon';

const LogicalCalculator: React.FC = () => {
    const [proposition, setProposition] = useState('');
    const [truthTable, setTruthTable] = useState<string[][]>([]);
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = (button: string) => {
        setProposition((prevProposition) => prevProposition + button);
    };

    const handleDeleteLastCharacter = () => {
        setProposition((prevProposition) => prevProposition.slice(0, -1));
    };

    const handleClearProposition = () => {
        setProposition('');
    };

    const evaluateProposition = () => {
        const truthTable: string[][] = [['p', 'q', proposition]];
        for (let p of [true, false]) {
            for (let q of [true, false]) {
                const result = evaluateExpression(proposition, p, q);
                truthTable.push([p ? 'v' : 'f', q ? 'v' : 'f', result ? 'v' : 'f']);
            }
        }
        setTruthTable(truthTable);
        setShowModal(true);
    };

    const evaluateExpression = (exp: string, p: boolean, q: boolean): boolean => {
        const replacedExp = exp
            .replace(/p/g, p.toString())
            .replace(/q/g, q.toString())
            .replace(/¬/g, '!')
            .replace(/∧/g, '&&')
            .replace(/∨/g, '||')
            .replace(/->/g, '>')
            .replace(/<>/g, '===');

        const evaluate = (exp: string): boolean => {
            // Manejar los paréntesis primero
            const regex = /\([^()]*\)/;
            let match;
            while ((match = exp.match(regex))) {
                const subExpression = match[0].slice(1, -1); // Eliminar paréntesis
                const subResult = evaluate(subExpression);
                exp = exp.replace(match[0], subResult.toString());
            }
    
            // Evaluar la expresión restante
            return safeEval(exp);
        };
        return evaluate(replacedExp);
    };

    const safeEval = (exp: String): boolean => {
        try {
          const tokens = exp.split(' ');
          let result = false;
          let operator = '';
          for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token === '&&' || token === '||' || token === '>' || token === '===' || token === '!') {
                operator = token;
            } else {
                const value = token === 'true' ? true : token === 'false' ? false : eval(token);
                if (token.split(">")[1]) {
                    result = !value;
                } else if (operator === '&&') {
                    result = result && value;
                } else if (operator === '||') {
                    result = result || value;
                } else if (operator === '>') {
                    result = !value;
                } else if (operator === '===') {
                    let index = tokens.findIndex(item => Array.isArray(item) && item.length === 3 && item.every(element => element === 'false'));
                    if (index !== -1) {
                        tokens.splice(index, 1);
                    }
                    let resultString = tokens.join(' ');
                    let resultArray = eval(resultString);
                    console.log(resultString, resultArray);
                    result = resultArray;
                } else if (operator === '!') {
                    result = !value;
                } else {
                    result = value;
                }
            }
          }
          return result;
        } catch (error) {
          console.error("Error evaluando la expresión:", error);
          return false;
        }
    };

  return (
    <LogicalCalculatorStyle>
        <div className='calculator'>
            <div className='calculator-panel'>
                <div className='screen'>
                    <textarea value={proposition} readOnly />
                </div>

                <div className='options'>
                    <div className="options-row">
                        <button onClick={handleDeleteLastCharacter}>DEL</button>
                        <button onClick={handleClearProposition}>AC</button>
                        <button onClick={() => handleButtonClick('->')}>→</button>
                    </div>
                    <div className="options-row">
                        <button onClick={() => handleButtonClick(' ¬ ')}>¬</button>
                        <button onClick={() => handleButtonClick(' ∧ ')}>∧</button>
                        <button onClick={() => handleButtonClick(' ∨ ')}>∨</button>
                    </div>
                    <div className="options-row">
                        <button onClick={() => handleButtonClick('p')}>p</button>
                        <button onClick={() => handleButtonClick('q')}>q</button>
                        <button onClick={() => handleButtonClick(' <> ')}>⇔</button>
                    </div>
                    <div className="options-row">
                        <button className='w-100' onClick={evaluateProposition}>=</button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className='container-modal'>
                    <div className="modal-table">
                        <div className="modal-table__content">
                            <div className='modal-header'>
                                <h5 className='mb-0'>Tabla de Verdad</h5>
                                <span className="close" onClick={() => setShowModal(false)}>
                                    <AppIcon  icon="times"></AppIcon>
                                </span>
                            </div>
                            <table className='vs-dataTable'>
                                <thead>
                                    <tr className='text-center'>
                                    {truthTable.length > 0 &&
                                        truthTable[0].map((header, index) => <th key={index}>{header}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {truthTable.length > 0 &&
                                    truthTable.slice(1).map((row, rowIndex) => (
                                        <tr className='text-center' key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>{cell}</td>
                                        ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </LogicalCalculatorStyle>
  );
};

export default LogicalCalculator;

const LogicalCalculatorStyle = styled.div`
    .calculator {
        padding-top: 3rem;
        margin: auto;
        width: 220px;
        height: 450px;
    }
    .calculator-panel {
        border-radius: 1rem;
        background-color: #4f4d4d;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
        position: relative;
    }
    .calculator-panel::before {
        content: "";
        height: 100%;
        border-radius: 1rem; 
        width: 93.5%;
        top: 0;
        right: 0;
        position: absolute;
        background-color: #666666;
    }
    .screen {
        position: relative; 
    }
    .options {
        display: flex;
        flex-direction: column;
        padding-top: .3rem;
        gap: .525rem;
        position: relative;
        z-index: 1;
    }
    .screen::before {
        content: "";
        height: 4.5rem;
        border-radius: .375rem 0 0 .375rem; 
        width: 1rem;
        top: 0;
        left: 0;
        position: absolute;
        background-color: #70b5e8;
        z-index: 3;
    }
    .screen textarea {
        width: 100%;
        height: 4.5rem;
        font-size: 1.25rem;
        background-color: #4aa5d3;
        border: none;
        border-radius: 0.375rem;
        padding: 1rem 1.5rem;
        resize: none;   
        position: relative;
        z-index: 2;
    }

    .screen textarea:focus {
        outline: unset;
    }

    .options button {
        display: flex;
        height: 50px;
        width: 50px;
        align-items: center;
        justify-content: center;
        outline: unset;
        border: none;
        background-color: #fff;
        border-radius: .325rem;
    }
    .options-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .container-modal {
        position: absolute;
        z-index: 4;
        background-color: rgba(0,0,0,.5);
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }
    .modal-table {
        display: flex;
        justify-content: center;
        align-items:center;
        width: 100%;
        height: 100%;
    }
    .modal-table__content {
        background-color: #fff;
        margin: auto;
        min-width: 23rem;
        border-radius: 1rem;
    }
    .modal-header {
        border-bottom: 1px solid rgba(0,0,0, .1);
        padding: 1.5rem 1.5rem;
    }
    .close {
        float: right;
        cursor: pointer;
    }

`
