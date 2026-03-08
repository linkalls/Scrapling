#!/usr/bin/env bun
import { Command } from "commander";
import { writeFileSync } from "fs";
import { Selector } from "./parser";
import { StaticFetcher, DynamicFetcher } from "./fetchers";

const program = new Command();

program
  .name("scrapling")
  .description("Scrapling - The Web Scraping Framework in TypeScript")
  .version("0.1.0");

const extract = program
  .command("extract")
  .description("Extract pages to a file directly without programming");

extract
  .command("get")
  .description("Use StaticFetcher to perform a GET request and save the content.")
  .argument("<url>", "Target URL for the request")
  .argument("<output_file>", "Output file path")
  .option("-s, --css-selector <selector>", "CSS selector to extract specific content")
  .action(async (url, outputFile, options) => {
    console.log(`Fetching ${url}...`);
    const fetcher = new StaticFetcher();
    try {
      const response = await fetcher.get(url);
      let content = response.body.toString();

      if (options.cssSelector) {
        const parser = new Selector(content);
        const matches = parser.css(options.cssSelector);
        content = matches.map(m => m.toString()).join("\n");
      }

      writeFileSync(outputFile, content, "utf-8");
      console.log(`Saved output to ${outputFile}`);
    } catch (e: any) {
      console.error(`Error: ${e.message}`);
    }
  });

extract
  .command("fetch")
  .description("Use DynamicFetcher to fetch content with browser automation.")
  .argument("<url>", "Target URL for the request")
  .argument("<output_file>", "Output file path")
  .option("--no-headless", "Run browser in visible mode")
  .option("-s, --css-selector <selector>", "CSS selector to extract specific content")
  .option("--wait-selector <selector>", "CSS selector to wait for before proceeding")
  .option("--network-idle", "Wait for network idle")
  .action(async (url, outputFile, options) => {
    console.log(`Dynamic fetching ${url}...`);
    const fetcher = new DynamicFetcher({
      headless: options.headless,
      network_idle: options.networkIdle,
      wait_selector: options.waitSelector,
    });

    try {
      const response = await fetcher.fetch(url);
      let content = response.body.toString();

      if (options.cssSelector) {
        const parser = new Selector(content);
        const matches = parser.css(options.cssSelector);
        content = matches.map(m => m.toString()).join("\n");
      }

      writeFileSync(outputFile, content, "utf-8");
      console.log(`Saved output to ${outputFile}`);
    } catch (e: any) {
      console.error(`Error: ${e.message}`);
    } finally {
      await fetcher.close();
    }
  });

extract
  .command("stealthy-fetch")
  .description("Use DynamicFetcher with advanced stealth features (mocked with TS DynamicFetcher).")
  .argument("<url>", "Target URL for the request")
  .argument("<output_file>", "Output file path")
  .option("--no-headless", "Run browser in visible mode")
  .option("-s, --css-selector <selector>", "CSS selector to extract specific content")
  .action(async (url, outputFile, options) => {
    console.log(`Stealthy fetching ${url}...`);
    const fetcher = new DynamicFetcher({
      headless: options.headless,
      extra_flags: ["--disable-blink-features=AutomationControlled"],
    });

    try {
      const response = await fetcher.fetch(url);
      let content = response.body.toString();

      if (options.cssSelector) {
        const parser = new Selector(content);
        const matches = parser.css(options.cssSelector);
        content = matches.map(m => m.toString()).join("\n");
      }

      writeFileSync(outputFile, content, "utf-8");
      console.log(`Saved output to ${outputFile}`);
    } catch (e: any) {
      console.error(`Error: ${e.message}`);
    } finally {
      await fetcher.close();
    }
  });

program.parse(process.argv);
