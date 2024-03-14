try {
  require('husky').install()
} catch (e) {
  console.warn("Git hooks are not installed:", e.message);
  console.warn("Please run `husky install` manually after you move project files to the .git root");
}
