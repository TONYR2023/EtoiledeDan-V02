<?php

namespace App\Repository;

use App\Entity\Booked;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Booked>
 */
class BookedRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Booked::class);
    }

    public function findAllById() : array
    {
        return $this->findBy([], ['id' => 'desc']);
    }
}
