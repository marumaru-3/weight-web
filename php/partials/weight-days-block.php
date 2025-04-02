<?php

namespace partials;

use lib\weightDaysCalc;

function weight_days_block($user, $weight_log, $key, $weight_logs)
{
    ?>
  <div class="weight-days__block card"
    data-date="<?php echo $weight_log->recorded_at; ?>">
    <div class="days-block__inner">
      <p class="weight-days__date">
        <?php echo $user->getDate($weight_log->recorded_at); ?>
      </p>
      <button class="weight-days__admin"
        data-modal="recordAdmin">
        <span class="material-symbols-outlined">
          edit
        </span>
      </button>
      <div class="weight-days__item weight-days__item--weight">
        <p class="weight-days__label">体重</p>
        <p class="weight-days__value">
          <span class="weight-days__num">
            <?php
            $weight = $weight_log->weight;

            echo $weight_log->getFloat($weight);
            ?>
          </span>
          <span class="weight-days__unit">kg</span>
        </p>
      </div>
      <div class="weight-days__item">
        <p class="weight-days__label">前日比</p>
        <p class="weight-days__value">
          <span class="weight-days__num">
            <?php if (!($key === 0)) {
                $beforeWeight = $weight_logs[$key - 1]->weight;
                echo weightDaysCalc::dayBefore($weight, $beforeWeight);
            } else {
                echo "--";
            } ?>
          </span>
          <span class="weight-days__unit">kg</span>
        </p>
      </div>
      <div class="weight-days__item">
        <p class="weight-days__label">BMI</p>
        <p class="weight-days__value">
          <span class="weight-days__num">
            <?php
            $height = $user->height;
            $bmi = weightDaysCalc::bmi($weight, $height);

            echo $bmi;
            ?>
          </span>
        </p>
      </div>
      <div class="weight-days__item">
        <p class="weight-days__label">体脂肪率<span class="in-bl">(推定)</span></p>
        <p class="weight-days__value">
          <span class="weight-days__num">
            <?php
            $gender = $user->gender;
            $age = age_calc($user->birthdate);

            echo weightDaysCalc::bfp($bmi, $gender, $age);
            ?>
          </span>
          <span class="weight-days__unit">%</span>
        </p>
      </div>
      <?php if (!empty($weight_log->memo)): ?>
        <div class="weight-days__item weight-days__item--memo">
          <p class="weight-days__label">一言メモ</p>
          <p class="weight-days__value"><?php echo $weight_log->memo; ?></p>
        </div>
      <?php endif; ?>
    </div>
  </div>
<?php
}
