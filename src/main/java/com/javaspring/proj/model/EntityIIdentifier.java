package com.javaspring.proj.model;

import com.javaspring.proj.util.model.IIdentifierAccessor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@MappedSuperclass
public abstract class EntityIIdentifier implements IIdentifierAccessor {
    @Id
    @Column(name = "ID")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    protected Long id;
}
