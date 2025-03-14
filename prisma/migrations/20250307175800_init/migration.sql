-- CreateTable
CREATE TABLE `dth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `BUD_ID` VARCHAR(255) NOT NULL,
    `BHD_ID` TEXT NULL,
    `BSL_ID` TEXT NULL,
    `DATECREATED` TEXT NULL,
    `LW_DATE` TEXT NULL,
    `USERNAME` TEXT NULL,
    `COST` TEXT NULL,
    `SELL` TEXT NULL,
    `AGENT` TEXT NULL,
    `RETAIL` TEXT NULL,
    `COSTTAX` TEXT NULL,
    `SELLTAX` TEXT NULL,
    `AGENTTAX` TEXT NULL,
    `RETAILTAX` TEXT NULL,
    `PAX` TEXT NULL,
    `CHS` TEXT NULL,
    `CHD` TEXT NULL,
    `INF` TEXT NULL,
    `ESC` TEXT NULL,
    `DRV` TEXT NULL,
    `GDE` TEXT NULL,
    `COSTFOC` TEXT NULL,
    `SCU_QTY` TEXT NULL,
    `SG` TEXT NULL,
    `TW` TEXT NULL,
    `DB` TEXT NULL,
    `TR` TEXT NULL,
    `QD` TEXT NULL,
    `OT` TEXT NULL,
    `SCU_FOC` TEXT NULL,
    `SERVICEDATE` TEXT NULL,
    `PRICECODE` TEXT NULL,
    `SERVICESTATUS` TEXT NULL,
    `OPT_ID` TEXT NULL,
    `BRANCH` TEXT NULL,
    `DEPARTMENT` TEXT NULL,
    `REFERENCE` TEXT NULL,
    `AGENTCODE` TEXT NULL,
    `BOOKINGSTATUS` TEXT NULL,
    `CURRENCY` TEXT NULL,
    `TAXINDICATOR` TEXT NULL,
    `ACTION` TEXT NULL,
    `DaySequence` TEXT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `BUD_ID_UNIQUE`(`BUD_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
