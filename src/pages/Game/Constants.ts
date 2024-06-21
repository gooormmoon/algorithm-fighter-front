export const LANGUAGE_VERSIONS: { [key: string]: string } = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  c: "1.1.1",
};
export const CODE_SNIPPETS: { [key: string]: string } = {
  javascript: `function greet(name) {
  \tconsole.log("Hello, " + name + "!");
}
  
  `,
  python: `def greet(name):
  \tprint("Hello, " + name + "!")
  
  `,
  java: `public class Main {
  \tpublic static void main(String[] args) {
  \t\tSystem.out.println("Hello, Java");
  \t}
}
  `,
  c: `int main() {
  \tscanf("%s", a);
}`,
};
