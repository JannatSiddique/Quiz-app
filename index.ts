import chalk from "chalk";
import inquirer from "inquirer";

let link : string = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async(data:string)=>{
    let fetchQuiz : any = await fetch(data)
    let result = await fetchQuiz.json()
    return result.results;
}
let data = await fetchData(link)
 
let startQuiz =async () => {
    let score : number = 0
    let name = await inquirer.prompt({
        type: "input",
        name: "firstname",
        message:"what is your name?"
    })

    for(let i= 1 ; i<=5 ; i ++){
          let answers= [...data[i].incorrect_answers,data[i]. correct_answer]
          let ans= await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map ((val:any)=> val),
          });
          if (ans.quiz == data[i].correct_answer) {
            ++score
            console.log(chalk.bold.italic.green("Correct"))
          }
          else {
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`)
          }
    }
    console.log(`Dear ${chalk.green.bold(name.firstname)}, your score is ${chalk.blue.bold(score)} out of ${chalk.green.bold('6')}`)
};
startQuiz();


