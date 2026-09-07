package com.cybosocks.runner;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {

    private static final Gson GSON = new Gson();

    public static void main(String[] args) {

        if (args.length != 1) {
            error("Usage: java -jar runner.jar <program.json>");
        }

        Path file = Path.of(args[0]);

        if (!Files.exists(file)) {
            error("File not found: " + args[0]);
        }

        try {

            String json = Files.readString(file);

            Program program = GSON.fromJson(json, Program.class);

            validateProgram(program);

            Turtle turtle = new Turtle();

            executeBlocks(program.getProgram(), turtle);

            System.out.println(
                    "Final position: (" +
                            turtle.getX() +
                            ", " +
                            turtle.getY() +
                            ") facing " +
                            formatDirection(turtle.getDirection()));

        } catch (JsonSyntaxException e) {

            error("Malformed JSON");

        } catch (IOException e) {

            error("Unable to read program file");

        } catch (IllegalArgumentException e) {

            error(e.getMessage());

        } catch (Exception e) {

            error("Unable to execute program");
        }
    }

    private static void executeBlocks(
            List<Block> blocks,
            Turtle turtle) {

        if (blocks == null) {
            throw new IllegalArgumentException(
                    "Missing program body");
        }

        for (Block block : blocks) {

            if (block == null) {
                throw new IllegalArgumentException(
                        "Invalid block");
            }

            executeBlock(block, turtle);
        }
    }

    private static void executeBlock(
            Block block,
            Turtle turtle) {

        if (block.getType() == null ||
                block.getType().isBlank()) {

            throw new IllegalArgumentException(
                    "Missing block type");
        }

        switch (block.getType()) {

            case "move":

                if (block.getSteps() == null) {
                    throw new IllegalArgumentException(
                            "Missing steps parameter");
                }

                if (block.getSteps() < 0) {
                    throw new IllegalArgumentException(
                            "Move steps cannot be negative");
                }

                turtle.move(block.getSteps());
                break;

            case "turn":

                if (block.getDirection() == null) {
                    throw new IllegalArgumentException(
                            "Missing direction parameter");
                }

                if (block.getDirection().equals("left")) {

                    turtle.turnLeft();

                } else if (block.getDirection().equals("right")) {

                    turtle.turnRight();

                } else {

                    throw new IllegalArgumentException(
                            "Invalid turn direction");
                }

                break;

            case "say":

                if (block.getText() == null) {
                    throw new IllegalArgumentException(
                            "Missing text parameter");
                }

                System.out.println(block.getText());
                break;

            case "repeat":

                if (block.getTimes() == null) {
                    throw new IllegalArgumentException(
                            "Missing repeat times parameter");
                }

                if (block.getTimes() < 0) {
                    throw new IllegalArgumentException(
                            "Repeat times cannot be negative");
                }

                if (block.getBody() == null) {
                    throw new IllegalArgumentException(
                            "Missing repeat body");
                }

                for (int i = 0; i < block.getTimes(); i++) {
                    executeBlocks(block.getBody(), turtle);
                }

                break;

            default:

                throw new IllegalArgumentException(
                        "Unknown block type: " + block.getType());
        }
    }

    private static void validateProgram(Program program) {

        if (program == null) {
            throw new IllegalArgumentException(
                    "Invalid program");
        }

        if (program.getProgram() == null) {
            throw new IllegalArgumentException(
                    "Missing program array");
        }
    }

    private static String formatDirection(
            Turtle.Direction direction) {

        return switch (direction) {

            case NORTH -> "North";
            case EAST -> "East";
            case SOUTH -> "South";
            case WEST -> "West";
        };
    }

    private static void error(String message) {

        System.err.println("Error: " + message);
        System.exit(1);
    }
}