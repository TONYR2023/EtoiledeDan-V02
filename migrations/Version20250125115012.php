<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250125115012 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create review table and modify comment column if not exists';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE review (
        id INT AUTO_INCREMENT NOT NULL, 
        name VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL, 
        rating INT NOT NULL, 
        comment VARCHAR(10000) DEFAULT NULL, 
        created_at DATETIME NOT NULL, 
        is_approved TINYINT(1) NOT NULL, 
        PRIMARY KEY(id)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }


    public function down(Schema $schema): void
    {
        // Si cette migration est annulée, supprimez la table review
        $this->addSql('DROP TABLE review');
    }
}
