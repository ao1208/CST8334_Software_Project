<?php

namespace App\Helpers;

class SheetInfo
{
    private string $id;
    private string $name;
    private string $range;

    public function __construct(string $id, string $name, string $range = null)
    {
        $this->id = $id;
        $this->name = $name;
        if ($range != null) {
            $this->range = $range;
        }
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getRange(): string
    {
        return $this->range;
    }

    public function setRange(string $range): void
    {
        $this->range = $range;
    }

    public function getNameAndRange(): string
    {
        $name_and_range = null;

        if ($this->getRange() === null) {
            $name_and_range = $this->getName();
        } else {
            $name_and_range = $this->getName() . '!' . $this->getRange();
        }

        return $name_and_range;
    }
}
