export const LANGUAGE_VERSIONS: { [key: string]: string } = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
};
export const CODE_SNIPPETS: { [key: string]: string } = {
  javascript: `function greet(name) {
  \tconsole.log("Hello, " + name + "!");
}
  
greet('Alex');
  `,
  python: `def greet(name):
  \tprint("Hello, " + name + "!")
  
greet('Alex')
  `,
  java: `public class Main {
  \tpublic static void main(String[] args) {
  \t\tgreet("Alex");
  \t}
  
  \tpublic static void greet(String name) {
  \t\tSystem.out.println("Hello, " + name + "!");
  \t}
}
  `,
};
