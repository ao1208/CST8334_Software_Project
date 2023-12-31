<?php
/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

namespace Google\Service\BigtableAdmin;

class CreateTableRequest extends \Google\Collection
{
  protected $collection_key = 'initialSplits';
  /**
   * @var Split[]
   */
  public $initialSplits;
  protected $initialSplitsType = Split::class;
  protected $initialSplitsDataType = 'array';
  /**
   * @var Table
   */
  public $table;
  protected $tableType = Table::class;
  protected $tableDataType = '';
  /**
   * @var string
   */
  public $tableId;

  /**
   * @param Split[]
   */
  public function setInitialSplits($initialSplits)
  {
    $this->initialSplits = $initialSplits;
  }
  /**
   * @return Split[]
   */
  public function getInitialSplits()
  {
    return $this->initialSplits;
  }
  /**
   * @param Table
   */
  public function setTable(Table $table)
  {
    $this->table = $table;
  }
  /**
   * @return Table
   */
  public function getTable()
  {
    return $this->table;
  }
  /**
   * @param string
   */
  public function setTableId($tableId)
  {
    $this->tableId = $tableId;
  }
  /**
   * @return string
   */
  public function getTableId()
  {
    return $this->tableId;
  }
}

// Adding a class alias for backwards compatibility with the previous class name.
class_alias(CreateTableRequest::class, 'Google_Service_BigtableAdmin_CreateTableRequest');
