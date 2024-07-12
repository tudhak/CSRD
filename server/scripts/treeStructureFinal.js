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
  }

  // Helper function to perform DFS and find the best matching parent node
  dfsFindParent(
    node,
    subtopic,
    level,
    bestMatch = { node: null, levelDiff: Infinity }
  ) {
    // Checking if current node matches the criteria
    if (node.subtopic === subtopic && node.level < level) {
      const levelDiff = level - node.level;
      if (levelDiff < bestMatch.levelDiff) {
        bestMatch.node = node;
        bestMatch.levelDiff = levelDiff;
        // Early termination if direct parent is found
        if (levelDiff === 1) return bestMatch.node;
      }
    }
    // Checking recursively in children nodes to check if one child node matches the criteria
    for (const child of [...node.children].reverse()) {
      const result = this.dfsFindParent(child, subtopic, level, bestMatch);
      // Early return if a direct parent has been found in the subtree
      if (result && bestMatch.levelDiff === 1) return result;
    }
    return bestMatch.node;
  }

  // Function to initiate the DFS search from the root nodes
  findParentNode(subtopic, level) {
    let bestMatch = { node: null, levelDiff: Infinity };
    for (const rootNode of [...this.nodes].reverse()) {
      const match = this.dfsFindParent(rootNode, subtopic, level, bestMatch);
      if (match) bestMatch = { node: match, levelDiff: level - match.level };
    }
    return bestMatch.node;
  }

  // Helper function to determine if a node can be added at the root level
  isRootLevelNode(level, subtopic) {
    const minLevelSubTopic = this.getMinLevelForSubTopic(subtopic);
    return (
      level === 1 ||
      !this.nodes.some((node) => node.subtopic === subtopic) ||
      level === minLevelSubTopic
    );
  }

  // Helper function to get the minimum level for a given topic
  getMinLevelForSubTopic(subtopic) {
    const levels = this.nodes
      .filter((node) => node.subtopic === subtopic)
      .map((node) => node.level);
    return levels.length ? Math.min(...levels) : Infinity;
  }

  // Function to insert nodes into the correct position of the tree based on level and topic
  insertNode(level, topic, subtopic, label) {
    const newNode = new TreeNode(topic, subtopic, label, level);

    // Check if the node can be directly added to the root level
    if (this.isRootLevelNode(level, subtopic)) {
      this.nodes.push(newNode);
      return;
    }

    // Attempt to find a suitable parent node
    const parent = this.findParentNode(subtopic, level);
    if (parent) {
      parent.children.push(newNode); // Insert as a child of the found parent
    } else {
      console.error(
        `No suitable parent found for topic: ${topic}, subtopic: ${subtopic}, label: ${label}, level: ${level}.`
      );
    }
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
