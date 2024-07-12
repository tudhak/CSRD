const fs = require("fs");
const csv = require("csv-parser");

// Script to turn taxonomy.csv into a tree structure

class TreeNode {
  constructor(topic, subtopic, label, level) {
    this.topic = topic;
    this.subtopic = subtopic;
    this.label = label;
    this.level = level;
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.nodes = [];
    this.stack = [];
  }

  // Function to insert nodes into the correct position of the tree based on level and topic
  // Using stack
  insertNode(level, topic, subtopic, label) {
    const newNode = new TreeNode(topic, subtopic, label, level);

    while (
      this.stack.length > 0 &&
      this.stack[this.stack.length - 1].level >= level
    ) {
      this.stack.pop();
    }

    if (
      this.stack.length === 0 ||
      this.stack[this.stack.length - 1].subtopic !== subtopic
    ) {
      this.nodes.push(newNode);
    } else {
      this.stack[this.stack.length - 1].children.push(newNode);
    }

    this.stack.push(newNode);
  }

  // Function to populate the tree from CSV data
  async buildTreeFromCSV(filePath) {
    try {
      const readStream = fs.createReadStream(filePath).pipe(csv());
      for await (const row of readStream) {
        this.insertNode(
          parseInt(row.level, 10),
          row.topic,
          row.subtopic,
          row.label
        );
      }
      console.log("CSV file successfully processed");
    } catch (error) {
      console.error("Failed to process CSV file:", error);
    }
  }

  // Function to print the tree visually
  printTree(nodes = this.nodes, indent = 0) {
    nodes.forEach((node) => {
      console.log(
        `${"|  ".repeat(node.level - 1)}|- ${node.topic}.(${node.subtopic}): ${
          node.label
        }`
      );
      if (node.children.length > 0) {
        this.printTree(node.children, indent + 1); // Recurse into children with increased indentation
      }
    });
  }

  // Function to write the tree structure to a JSON file
  async writeNodesToJsonFile(filePath) {
    try {
      const data = JSON.stringify(this.nodes, null, 2); // Convert nodes to a formatted JSON string
      await fs.promises.writeFile(filePath, data, "utf8");
      console.log("Nodes successfully written to JSON file.");
    } catch (error) {
      console.error("Failed to write nodes to JSON file:", error);
    }
  }
}

const tree = new Tree();

async function buildAndWriteTree() {
  await tree.buildTreeFromCSV(`${__dirname}/../data/taxonomyV2.csv`);
  await tree.writeNodesToJsonFile(`${__dirname}/../data/treeStructure.json`);
}

async function buildAndPrintTree() {
  await tree.buildTreeFromCSV(`${__dirname}/../data/taxonomyV2.csv`);
  tree.printTree();
}

buildAndWriteTree();
// buildAndPrintTree();
