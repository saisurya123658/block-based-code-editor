package com.cybosocks.runner;

public class Turtle {

    private int x;
    private int y;

    private Direction direction;

    public enum Direction {
        NORTH,
        EAST,
        SOUTH,
        WEST
    }

    public Turtle() {
        this.x = 0;
        this.y = 0;
        this.direction = Direction.NORTH;
    }

    public void move(int steps) {

        switch (direction) {

            case NORTH:
                y += steps;
                break;

            case EAST:
                x += steps;
                break;

            case SOUTH:
                y -= steps;
                break;

            case WEST:
                x -= steps;
                break;
        }
    }

    public void turnLeft() {

        direction = switch (direction) {

            case NORTH -> Direction.WEST;
            case WEST -> Direction.SOUTH;
            case SOUTH -> Direction.EAST;
            case EAST -> Direction.NORTH;
        };
    }

    public void turnRight() {

        direction = switch (direction) {

            case NORTH -> Direction.EAST;
            case EAST -> Direction.SOUTH;
            case SOUTH -> Direction.WEST;
            case WEST -> Direction.NORTH;
        };
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public Direction getDirection() {
        return direction;
    }
}